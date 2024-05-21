import MainSlider from "@/components/main/main.slider";
import { sendRequest } from "@/utils/api";
import { Container } from "@mui/material";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  const ballads = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: "http://localhost:5000/api/v1/tracks?category=Ballad",
    method: "GET",
  });

  return (
    <Container>
      <MainSlider data={ballads?.data ?? []} />
    </Container>
  );
}
