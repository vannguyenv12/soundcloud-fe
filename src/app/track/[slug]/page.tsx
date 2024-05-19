"use client";

import { useSearchParams } from "next/navigation";

const DetailTrackPage = ({ params }: { params: { slug: string } }) => {
  const searchParams = useSearchParams();
  const search = searchParams.get("audio");

  console.log(">>> check search", search);
  return <div>Detail Track Page</div>;
};

export default DetailTrackPage;
