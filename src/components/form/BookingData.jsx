import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import { openLogIn } from "../../redux/modalStateSlice";
import apiBookVenue from "../../utils/api/apiPostData";
import DateRangePicker from "../ui/DateRangePicker";
import { isWithinInterval, format } from "date-fns";
import getNumberOfNights from "../../utils/getNumberOfNights";

export default function BookingData({ venue }) {
	const isLogIn = useSelector((state) => state.isLoggedIn.isLogIn);
	const dispatch = useDispatch();
	const [response, setResponse] = useState(null);
	const [totalPrice, setTotalPrice] = useState(venue.price);
	const [numberOfGuests, setNumberOfGuests] = useState(1);
	const [dateRange, setDateRange] = useState([null, null]);
	const [startDate, endDate] = dateRange;
	const [isError, setIsError] = useState(true);
	const [showError, setShowError] = useState("hidden");

	const getDateRange = (range) => {
		setDateRange(range);
	};

	const bookVenue = async () => {
		setResponse(
			await apiBookVenue(`https://api.noroff.dev/api/v1/holidaze/bookings`, {
				dateFrom: startDate.toISOString(),
				dateTo: endDate.toISOString(),
				guests: numberOfGuests,
				venueId: venue.id,
			})
		);
	};

	useEffect(() => {
		const allDates = [];
		let currentDate = new Date(startDate);
		const numberOfNights = getNumberOfNights(startDate, endDate);
		numberOfNights ? setTotalPrice(venue.price * numberOfNights) : setTotalPrice(venue.price);
		setShowError("hidden");
		// Create an array with all the dates from the chosen period
		while (currentDate <= endDate) {
			allDates.push(new Date(currentDate));
			currentDate.setDate(currentDate.getDate() + 1);
		}
		// Check if the chosen period doesn't include any previously booked days
		const hasConflict = allDates.some((date) =>
			venue.bookings.some((booking) =>
				isWithinInterval(date, {
					start: new Date(booking.dateFrom),
					end: new Date(booking.dateTo),
				})
			)
		);
		hasConflict || !startDate || !endDate ? setIsError(true) : setIsError(false);
	}, [dateRange]);

	if (response && response.id) {
		return (
			<section className="mt-5 p-10 border ">
				<h3 className="pb-4 text-green-500 text-center text-2xl font-semibold">Booking successful</h3>
				<p className="py-1 text-lg font-semibold tracking-tight text-blue-main">
					{venue.name}
					<span className="text-md font-medium"> - is yours:</span>
				</p>
				<p className="py-1 mx-1 text-md font-semibold tracking-tight text-blue-main">
					From: {format(new Date(response.dateFrom), "dd/MM/yyyy")}
				</p>
				<p className="py-1 mx-1 text-md font-semibold tracking-tight text-blue-main">To: {format(new Date(response.dateTo), "dd/MM/yyyy")}</p>
				<p className="pt-3 text-xl font-semibold tracking-tight text-blue-main">
					<span className="text-md text-gray-500">Total payed: </span> ${totalPrice}
				</p>
				<Link
					to={`/profile/${response.name}`}
					className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-red-main px-8 py-3 text-base font-medium text-blue-main outline-none hover:ring-2 hover:ring-blue-main ring-offset-1"
				>
					View booking
				</Link>
			</section>
		);
	}
	return (
		<section className="mt-5 p-10 border ">
			<h3 className="pb-6 text-blue-main text-lg text-center font-semibold">Book your dream vacation:</h3>
			<DateRangePicker venueBookings={venue.bookings} getDateRange={getDateRange} />
			<p className={`${showError} text-xs text-red-600 italic`}>This dates are not available</p>
			<div className="mx-auto my-8 md:mx-0">
				<span className="text-gray-500 select-none mr-5">Guests(max {venue.maxGuests}): </span>
				<button
					className={`py-0.5 px-3 border-2 border-slate-300 rounded-lg shadow-md transition ease-in-out delay-100 focus:outline-none ${
						numberOfGuests === 1 ? "opacity-20" : "hover:cursor-pointer hover:border-slate-400 opacity-80"
					}`}
					disabled={numberOfGuests === 1 ? true : false}
					onClick={() => setNumberOfGuests(numberOfGuests - 1)}
				>
					-
				</button>
				<span className="mx-4 select-none">{numberOfGuests}</span>
				<button
					className={`py-0.5 px-3 border-2 border-slate-300 rounded-lg shadow-md transition ease-in-out delay-100 focus:outline-none ${
						numberOfGuests === venue.maxGuests ? "opacity-20" : "hover:cursor-pointer hover:border-slate-400"
					}`}
					disabled={numberOfGuests === venue.maxGuests ? true : false}
					onClick={() => setNumberOfGuests(numberOfGuests + 1)}
				>
					+
				</button>
			</div>
			<p className="mx-1 text-xl font-semibold tracking-tight text-blue-main">
				<span className="text-md text-gray-500">Total price: </span> ${totalPrice}
			</p>
			{/* <button
				type="submit"
				className={`mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-red-main px-8 py-3 text-base font-medium text-gray-900 outline-none hover:ring-2 hover:ring-blue-main ring-offset-1 ${
					isLogIn ? "" : "hidden"
				}`}
				onClick={() => (isError ? setShowError("flex") : bookVenue())}
			>
				Book now
			</button> */}
			<button
				type="submit"
				className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-red-main px-8 py-3 text-base font-medium text-gray-900 outline-none hover:ring-2 hover:ring-blue-main ring-offset-1"
				onClick={() => (isLogIn ? (isError ? setShowError("flex") : bookVenue()) : dispatch(openLogIn()))}
			>
				Book now
			</button>
			{/* <div className={!isLogIn ? "flex justify-center text-red-600 font-semibold mt-8" : "hidden"}>Please, Log in to book</div> */}
		</section>
	);
}
