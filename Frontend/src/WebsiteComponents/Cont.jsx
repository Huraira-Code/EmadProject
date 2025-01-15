import React from "react";

const Cont = () => {
  return (
    <>
      <div className="container" style={{ marginTop: "120px" }}>
        <section className="row">
          <div className="col-12">
            <div className="text-center">
              <h1
                className="jacques-francois-shadow-regular"
                style={{
                  fontSize: "60px",
                  wordSpacing: "10px",
                  letterSpacing: "2px",
                }}
              >
                Contact Us
              </h1>
              <p
                style={{
                  fontSize: "25px",
                  wordSpacing: "2px",
                  fontWeight: "300px",
                  padding: "5px 50px 0 50px",
                  color: "grey",
                }}
              >
                We love hearing from our customers. Feel free to share your
                experience or ask any questions you may have.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Cont;
