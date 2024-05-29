import WaveTrack from "@/components/track/wave.track";
import { Container } from "@mui/material";
import { useSearchParams } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";
import { generateId, sendRequest } from "@/utils/api";
import slugify from "slugify";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.slug;

  // fetch data
  const track = await sendRequest<IBackendRes<ITrackTop>>({
    url: `http://localhost:5000/api/v1/tracks/${generateId(id)}`,
    method: "GET",
  });

  return {
    title: track.data?.title,
    description: track.data?.description,
    openGraph: {
      title: "Văn Nguyễn",
      description: "The life is too short to code",
      type: "website",
      images: ["https://avatars.githubusercontent.com/u/88303019?v=4"],
    },
  };
}

const DetailTrackPage = (props: any) => {
  return (
    <Container>
      <div>
        <WaveTrack />
      </div>
    </Container>
  );
};

export default DetailTrackPage;
