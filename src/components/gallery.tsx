import { useState } from "react";
import Fancybox from "./fancybox";
import trash from "../../src/assets/img/trash.png";
import { DeleteModal } from "./deleteModal";

interface GalleryProps {
  apiUrl: string;
}
export function Gallery({ apiUrl }: GalleryProps) {
  const [modal, setModal] = useState(false);
  const [id, setId] = useState("");
  const [imageTitle, setImageTitle] = useState("");
  const [imageData, setImageData] = useState({
    images: [
      {
        name: "",
        author: "",
        title: "",
        newFileName: "",
        _id: "",
      },
    ],
  });
  function handleDelete(e: any) {
    setModal(true);
    console.log(e.target);
    setId(e.target.dataset.id);
    setImageTitle(e.target.dataset.title);
  }

  useState(() => {
    fetch(`${apiUrl}/getImageData`).then((res) => {
      res.json().then((data) => {
        setImageData(data);
      });
    });
  });
  return (
    <div>
      <DeleteModal
        _id={id}
        display={modal}
        setModal={setModal}
        imageTitle={imageTitle}
        apiUrl={apiUrl}
      />
      <div className="container">
        <div className="gallery">
          <h2>Galeria</h2>
          <div className="gallery__wrapper">
            <Fancybox
              options={{
                Carousel: {
                  infinite: false,
                },
              }}
            >
              {imageData.images.map((image: any) => (
                <div className="gallery__item" key={image._id}>
                  <div
                    className="gallery__delete"
                    onClick={handleDelete}
                    data-id={image._id}
                    data-title={image.title}
                  >
                    <img
                      src={trash}
                      alt="apagar"
                      data-id={image._id}
                      data-title={image.title}
                    />
                  </div>
                  <a
                    className="gallery__item__link"
                    data-fancybox="gallery"
                    data-caption={image.title + " - " + image.author}
                    href={`${apiUrl}/getImages/${image.newFileName}`}
                  >
                    <div
                      className="gallery__item__content"
                      style={{
                        background: `url(${apiUrl}/getImages/${image.newFileName})`,
                      }}
                    >
                      <div className="gallery__item__info">
                        <div className="gallery__item__title">
                          {image.title}
                        </div>
                        <div className="gallery__item__author">
                          Autor: <span>{image.author}</span>
                        </div>
                        <div className="gallery__item__author">
                          Enviado por: <span>{image.name}</span>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </Fancybox>
          </div>
        </div>
      </div>
    </div>
  );
}
