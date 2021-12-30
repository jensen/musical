import { useEffect, useRef, useState } from "react";
import { LoaderFunction, useLoaderData, json } from "remix";
import { getTopTracks } from "~/services/api";
import PlayButton from "~/components/PlayButton";
import PauseButton from "~/components/PauseButton";

export const loader: LoaderFunction = async ({ params }) => {
  const tracks = await getTopTracks(params.id);

  return json(tracks);
};

const Track = (props) => {
  const [image] = props.album.images;
  const audioRef = useRef();
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.pause();
    audioRef.current.src = props.preview_url;
  }, [props.preview_url]);

  return (
    <li className="p-2 flex items-center space-x-6 h-32">
      {image && (
        <div className="w-24 h-24 sm:w-32 sm:h-32 relative">
          <img
            className="absolute rounded-full border-2 border-white"
            src={image.url}
          />
          <div
            className="absolute w-full h-full flex justify-center items-center"
            onClick={() => {
              if (audioRef.current) {
                if (!playing && audioRef.current.paused) {
                  audioRef.current.play();
                }

                if (playing && audioRef.current.paused === false) {
                  audioRef.current.pause();
                }
              }

              setPlaying(!playing);
            }}
          >
            {playing ? <PauseButton /> : <PlayButton />}
          </div>
        </div>
      )}
      <div className="flex-1">
        <a
          href={`https://open.spotify.com/track/${props.id}`}
          className="text-white hover:text-green-900"
        >
          <h2 className="font-bold text-xl sm:text-4xl">{props.name}</h2>
        </a>
      </div>
      {/* <audio ref={audioRef}>
        <source src={props.preview_url} type="audio/mpeg"></source>
      </audio> */}
    </li>
  );
};

export default function ArtistView() {
  const { tracks } = useLoaderData();

  return (
    <div className="h-full flex flex-col justify-center items-center space-y-4">
      <h2 className="text-white text-6xl font-bold uppercase">
        Top<span className="text-green-400">Tracks</span>
      </h2>
      <ul className="flex flex-col space-y-2">
        {tracks.slice(0, 5).map((track) => (
          <Track key={track.id} {...track} />
        ))}
      </ul>
    </div>
  );
}
