import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../Base_URL/BASE_URL";

const AcceptedAndRejectedReservation = () => {
  const [loading, setLoading] = useState();
  const [allOrder, setAllOrder] = useState();
  console.log(allOrder);

  const getReservation = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/allReservation`);
      setAllOrder(res.data.data);
      // console.log("Acc&RejData", res.data);
      setLoading(true);
    } catch (error) {
      setLoading(true);
      // console.log(error);
      alert(error.message);
    }
  };
  useEffect(() => {
    getReservation();
  }, []);
  return (
    <>
      <div className="container">
        <section className="row">
          <div className="col-12">
            <div className="text-center">
              <h1
                className="jacques-francois-shadow-regular"
                style={{
                  fontSize: "60px",
                  color: "rgb(295, 150, 0)",
                }}
              >
                Reservations Detail
              </h1>
            </div>
          </div>
          <hr />

          {/* Accepted Order */}
          <div
            className="col-12 col-md-6 mb-4"
            style={{
              borderRight: "2px solid #ccc", // Vertical line between sections
              paddingRight: "20px", // Adds space between border and content
            }}
          >
            <h1 className="jacques-francois-shadow-regular text-success text-center">
              Accepted Reservations
            </h1>

            <div
              style={{
                marginTop: "20px",
                maxHeight: "350px",
                overflowY: "auto",
              }}
              className="table-responsive" // Responsive table wrapper
            >
              <table className="table table-success table-striped table-bordered border-success">
                <thead>
                  <tr className="jacques-francois-shadow-regular fs-5">
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Phone No.</th>
                    <th scope="col">Size</th>
                    <th scope="col">Date</th>
                    <th scope="col">Day</th>
                    <th scope="col">Time</th>
                  </tr>
                </thead>

                {allOrder?.map((order, index) => {
                  const createdAtDate = order.createdAt.split("T")[0];
                  // date.toISOString().split('T')[0]
                  if (order.status === "Accepted") {
                    return (
                      <tbody>
                        <tr>
                          <th scope="row" className="pt-3">
                            {index + 1}
                          </th>
                          <td className="pt-3">{order.fullName}</td>
                          <td className="pt-3">{order.phoneNumber}</td>
                          <td className="pt-3">{order.partySize}</td>
                          <td className="pt-3">{order.ReservationDate}</td>
                          <td className="pt-3">{order.ReservationDay}</td>
                          <td className="pt-3">{order.ReservationTime}</td>
                        </tr>
                      </tbody>
                    );
                  } else {
                  }
                })}
              </table>
            </div>
          </div>

          {/* Rejected Order */}
          <div className="col-12 col-md-6 mb-4">
            <h1 className="jacques-francois-shadow-regular text-danger text-center">
              Rejected Reservations
            </h1>

            <div
              style={{
                marginTop: "20px",
                maxHeight: "350px",
                overflowY: "auto",
              }}
              className="table-responsive" // Responsive table wrapper
            >
              <table className="table table-danger table-striped table-bordered border-danger">
                <thead>
                  <tr className="jacques-francois-shadow-regular fs-5">
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Phone No.</th>
                    <th scope="col">Size</th>
                    <th scope="col">Date</th>
                    <th scope="col">Day</th>
                    <th scope="col">Time</th>
                  </tr>
                </thead>
                {allOrder?.map((order, index) => {
                  const createdAtDate = order.createdAt.split("T")[0];
                  // date.toISOString().split('T')[0]
                  if (order.status === "Rejected") {
                    return (
                      <tbody>
                        <tr>
                          <th scope="row" className="pt-3">
                            {index + 1}
                          </th>
                          <td className="pt-3">{order.fullName}</td>
                          <td className="pt-3">{order.phoneNumber}</td>
                          <td className="pt-3">{order.partySize}</td>
                          <td className="pt-3">{order.ReservationDate}</td>
                          <td className="pt-3">{order.ReservationDay}</td>
                          <td className="pt-3">{order.ReservationTime}</td>
                        </tr>
                      </tbody>
                    );
                  }
                })}
              </table>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AcceptedAndRejectedReservation;
