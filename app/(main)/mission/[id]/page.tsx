import Footer from "@/app/(home)/_components/Footer";
import Nav from "@/app/(home)/_components/Nav";
import Container from "@/components/Container";
import { IMissionFullInfo } from "@/shared/types";
import MissionInfo from "../_components/MissionInfo";

type Props = {
    params: {
        id: string;
    };
};

const MissionPage = async ({ params }: Props) => {
    const res = await fetch(`${process.env.API_URL}/api/event/${params.id}`, {
        cache: "force-cache",
    });

    const missionInfo: IMissionFullInfo =
        (await res.json()) as IMissionFullInfo;

    return (
        <div>
            <Nav />

            <main className="min-h-dvh pt-32">
                <Container>
                    <MissionInfo id={params.id} {...missionInfo} />
                </Container>
            </main>

            <Footer />
        </div>
    );
};

export default MissionPage;
