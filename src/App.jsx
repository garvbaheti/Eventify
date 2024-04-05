
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutUs from "./pages/AboutUs";
import KnowHow from "./pages/KnowHow";
import Developer from "./pages/Developer";
import ContactUs from "./pages/ContactUs";
import EventCreation from "./pages/EventCreation";
import { useAuth } from "@clerk/clerk-react";
import ErrorPage from "./pages/ErrorPage";
import EventListPage from "./pages/EventListPage";
import SingleEventPage from "./pages/SingleEventPage";


const App = () => {
  const { isSignedIn } = useAuth();
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/workflow" element={<KnowHow />} />
          <Route path="/developers" element={<Developer />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/allevents" element={<EventListPage />} />
          <Route path="/event/:eventId" element={<SingleEventPage />} />
          <Route path="/edit/:eventId" element={<EventCreation />} />
          
          {isSignedIn ? (
            <Route path="/createevent" element={<EventCreation />} />
          ) : (
            <Route path="/createevent" element={<ErrorPage />} />
          )

          }

        </Routes>

      </BrowserRouter>
    </>
  );
};

export default App;
