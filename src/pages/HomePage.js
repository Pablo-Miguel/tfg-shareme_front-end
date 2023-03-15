import StuffCard from "../components/StuffCard/StuffCard";

const HomePage = () => {
  return (
    <>
      <h1
        style={{
          textAlign: "center",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        Home Page
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <input
          style={{
            width: "100%",
            height: "30px",
            margin: "10px",
          }}
          type="text"
          name="search_bar"
          id="search_bar"
        />
        <button
          style={{
            width: "100px",
            height: "30px",
            margin: "10px",
          }}
          type="submit"
        >
          Search
        </button>
      </div>
      <div
        id="divider"
        style={{
          height: "1px",
          backgroundColor: "grey",
          margin: "10px",
        }}
      ></div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h2>No stuff have been created yet!</h2>
        <StuffCard
          img={
            "http://i1.adis.ws/i/canon/eos-r10-frt_range_9feaf965e90e48d3a164d106d9939020"
          }
          title={"Camera"}
          views={0}
          likes={0}
          category={"Photography"}
          owner={"Pablo Miguel del Castillo"}
          price={1000}
          has_offer={false}
          offer_price={0}
        />
        <StuffCard
          img={
            "http://i1.adis.ws/i/canon/eos-r10-frt_range_9feaf965e90e48d3a164d106d9939020"
          }
          title={"Camera 2"}
          views={0}
          likes={0}
          category={"Photography"}
          owner={"Pablo Miguel del Castillo"}
          price={1000}
          has_offer={true}
          offer_price={500}
        />
      </div>
    </>
  );
};

export default HomePage;
