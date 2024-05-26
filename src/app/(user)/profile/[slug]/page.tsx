import ProfileTrack from "@/components/profile/track";
import { sendRequest } from "@/utils/api";
import { Container } from "@mui/material";

const ProfilePage = async ({ params }: { params: { slug: string } }) => {
  const tracks = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: `http://localhost:5000/api/v1/tracks?category=Ballad&userId=${params.slug}`,
    method: "GET",
  });

  return (
    <Container>
      <ProfileTrack tracks={tracks} />
    </Container>
  );
};

export default ProfilePage;
