import { useEffect, useState, useRef } from "react";
import { getHotspot } from "../../service/TourService";
import { useParams } from "react-router-dom";
import styles from "./styles.module.css";
import { Loader } from "../Loader/Loader";
import { Viewer } from '@photo-sphere-viewer/core';
import '@photo-sphere-viewer/core/index.scss';

export function Hotspot() {
  const [hotspot, setHotspotConfig] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const viewerRef = useRef(null);

  const { hotspotId } = useParams();

  useEffect(() => {
    const fetchHotspotConfig = async () => {
      try {
        const response = await getHotspot(hotspotId);
        setHotspotConfig(response);
        setLoading(false);
      } catch (error) {
        // Handle error here
        setLoading(false);
      }
    };

    fetchHotspotConfig();
  }, [hotspotId]);

  useEffect(() => {
    if (hotspot.length > 0 && !selectedImage) {
      setSelectedImage(hotspot[0]);
    }
  }, [hotspot, selectedImage]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  useEffect(() => {
    if (selectedImage) {
      if (viewerRef.current) {
        viewerRef.current.setPanorama(selectedImage.assets.standard);
      } else {
        const viewer = new Viewer({
          container: document.querySelector('#viewer'),
          panorama: selectedImage.assets.standard,
        });
        viewerRef.current = viewer;
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





