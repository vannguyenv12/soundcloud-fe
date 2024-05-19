import MainSlider from "@/components/main/main.slider";
import { sendRequest } from "@/utils/api";
import { Container } from "@mui/material";

export default async function HomePage() {
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
