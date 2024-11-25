import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then(({ data }) => {
      setPlace(data);
      setLoading(false);
    });
  }, [id]);

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0  text-white min-h-screen">
        <div className="bg-black p-8 grid gap-4">
          <h2 className="text-2xl ">Photos of {place.title}</h2>
          <button
            onClick={() => {
              setShowAllPhotos(false);
            }}
            className="fixed top-2 right-3 bg-red-700 text-white font-bold px-3 py-1 rounded-full hover:bg-white hover:text-red-700 border border-red-700 transition-all duration-200 ease-in-out"
          >
            X
          </button>
          {place.addedPhotos.length > 0 &&
            place.addedPhotos.map((photo) => (
              <div key={photo} className="flex justify-center">
                <img
                  className="w-[1500px] rounded-2xl"
                  src={`http://localhost:4000/uploads/${photo}`}
                  alt=""
                />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-5 bg-gray-100 -mx-8 p-8  ">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <h1 className="text-3xl">{place.title}</h1>
          <a
            href={"https://maps.google.com/?q=" + place.address}
            target="_blank"
            className="block font-semibold underline my-2"
          >
            <div className="flex">
              <img
                className="flex w-10 h-full mr-2 "
                src="/images/mapIcon.jpg"
                alt=""
              />
              {place.address}
            </div>
          </a>
          <div className="relative">
            <div className="grid gap-2 grid-cols-[2fr_1fr]">
              <div>
                {place.addedPhotos.length > 0 && (
                  <div>
                    <img
                      className="aspect-square object-cover h-[850px] w-full rounded-l-3xl"
                      src={`http://localhost:4000/uploads/${place.addedPhotos[0]}`}
                      alt=""
                    />
                  </div>
                )}
              </div>
              <div className="grid">
                {place.addedPhotos.length > 0 && (
                  <img
                    className="aspect-square object-cover h-[450px] w-full rounded-r-3xl"
                    src={`http://localhost:4000/uploads/${place.addedPhotos[1]}`}
                    alt=""
                  />
                )}
                <div className="overflow-hidden">
                  {place.addedPhotos.length > 0 && (
                    <img
                      className="aspect-square object-cover relative top-2 h-[400px] w-full rounded-r-3xl"
                      src={`http://localhost:4000/uploads/${place.addedPhotos[2]}`}
                      alt="Nudes??"
                    />
                  )}
                </div>
              </div>
              <button
                className="flex absolute bottom-2 right-2 py-2 px-4 bg-gray-100 rounded-2xl border hover:bg-yellow-100 transform active:scale-95 transition-transform duration-150"
                onClick={() => setShowAllPhotos(true)}
              >
                <img
                  className="w-8 h-full mr-2"
                  src="/images/pictureIcon.png"
                  alt=""
                />
                Show More Photos
              </button>
            </div>
          </div>
          <h2 className="mt-4 font-semibold text-2xl">Description</h2>
          {place.description}
        </>
      )}
    </div>
  );
}
