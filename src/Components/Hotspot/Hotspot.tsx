import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

import { getHotspot } from "../../service/TourService";
import { Loader } from "../Loader/Loader";
import { HotspotType } from "../../Types/types";
import { Viewer } from '@photo-sphere-viewer/core';
import styles from "./styles.module.css";
import '@photo-sphere-viewer/core/index.scss';

export function Hotspot() {
  const [hotspot, setHotspotConfig] = useState<HotspotType[] | []>([]);
  const [selectedImage,  setSelectedImage] = useState<null | HotspotType | string>(null);
  const [loading, setLoading] = useState(true);
  const viewerRef = useRef<Viewer | null>(null);


  const { hotspotId } = useParams<{ hotspotId: string }>();


  useEffect(() => {
    const fetchHotspotConfig = async () => {
      try {
        if(hotspotId !== undefined) {
        const response = await getHotspot(hotspotId);
        setHotspotConfig(response);
        setLoading(false);
        } else {
          throw new Error("Hotspot not found");
        }
      } catch (error) {
        if (error instanceof Error) {
          // Type guard to arrow down the type to Error
          console.log(error.message);
          setLoading(false);

        } else {
          console.log('An unknown error occurred');
        }
      }
    };

    fetchHotspotConfig();
  }, [hotspotId]);

  useEffect(() => {
    if (hotspot.length > 0 && !selectedImage) {
      setSelectedImage(hotspot[0]);
    }
  }, [hotspot, selectedImage]);

  const handleImageClick = (image: HotspotType | string) => {
    setSelectedImage(image);
  };
  

  useEffect(() => {
    if (selectedImage && typeof selectedImage !== 'string') {
      if (viewerRef.current) {
        viewerRef.current.setPanorama(selectedImage.assets.standard);
      } else {
        const container = document.querySelector('#viewer');
        if (container) {
          const viewer = new Viewer({
            container: container as HTMLElement,
            panorama: selectedImage.assets.standard,
          });
          viewerRef.current = viewer;
        }
      }
    }
  }, [selectedImage]);
  

  

  return (
    <div className="container">
      <h1 className={styles.photosTitle}>Photos</h1>
      {loading ? (
        <Loader />
      ) : hotspot.length > 0 ? (
        <>
          <section className={styles.secondaryContainer}>
            {hotspot.map((image, index) => (
              <div
                key={image.id}
                className={`${styles.secondary} ${
                  selectedImage === image ? styles.selected : ""
                }`}
                onClick={() => handleImageClick(image)}
              >
                <img
                  src={image.assets.standard}
                  alt={`Image ${index + 1}`}
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
              </div>
            ))}
          </section>
          <section id="viewer" className={styles.main}></section>
        </>
      ) : (
        <h2>No photos available.</h2>
      )}
    </div>
  );
}





