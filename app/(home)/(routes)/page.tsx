import TelegramPopup from "@/components/TelegramPopup";
import Footer from "../_components/Footer";
import Nav from "../_components/Nav";
import Advantages from "../_sections/Advantages";
import Answers from "../_sections/Answers";
import Categories from "../_sections/Categories";
import Header from "../_sections/Header";
import Missions from "../_sections/Missions";

const HomePage = () => {
    return (
        <>
            <TelegramPopup />

            <Nav />

            <Header />

            <Missions />

            <Categories />

            <Advantages />

            <Answers />

            <Footer />
        </>
    );
};

export default HomePage;
