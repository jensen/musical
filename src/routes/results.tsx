import type { LoaderFunction } from "remix";
import { json, useLoaderData, Link } from "remix";
import { getSearch } from "~/services/api";

export let loader: LoaderFunction = async ({ request, params }) => {
  const search = new URL(request.url).searchParams;
  const result = await getSearch(search.get("query"));

  return json(result);
};

export default function Index() {
  const { artists } = useLoaderData();

  return (
    <ul className="p-2 grid grid-cols-4">
      {artists.items
        .filter((artist) => artist.images.length > 0 && artist.popularity > 10)
        .map((artist) => {
          const [image] = artist.images;

          return (
            <Link key={artist.id} to={`../artist/${artist.id}`}>
              <li className="p-2 relative">
                {image && <img className="rounded-t-2xl" src={image.url} />}
                <h2 className="px-4 py-2 flex justify-center items-center bg-white rounded-b-2xl text-green-500 font-bold text-xl">
                  {artist.name}
                </h2>
              </li>
            </Link>
          );
        })}
    </ul>
  );
}
