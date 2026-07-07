import React, { useState } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col, Carousel } from "react-bootstrap";
import { dataportfolio, meta } from "../../content_option";
import { getPortfolioImagePaths } from "../../utils/portfolioImages";

export const Portfolio = () => {
  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <HelmetProvider>
      <Container className="About-header">
        <Helmet>
          <meta charSet="utf-8" />
          <title> Portfolio | {meta.title} </title>
          <meta name="description" content={meta.description} />
        </Helmet>
        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg="8">
            <h1 className="display-4 mb-4"> Portfolio </h1>
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>
        <div className="mb-5">
          <h3 className="mb-3 portfolio-featured-title">Featured Work</h3>

          <Carousel
            fade={false}
            indicators={true}
            interval={5000}
            pause="hover"
          >
            {dataportfolio.slice(0, 3).map((data, i) => {
              const images = getPortfolioImagePaths(data.img);

              return (
                <Carousel.Item key={`carousel-${i}`}>
                  <div className="po_item po_item--carousel">
                    <img
                      className="d-block w-100 po_item__image"
                      src={images.medium}
                      srcSet={`${images.medium} 800w, ${images.full} 2400w`}
                      sizes="(max-width: 768px) 100vw, 800px"
                      alt={data.description}
                      loading={i === 0 ? "eager" : "lazy"}
                      fetchPriority={i === 0 ? "high" : "auto"}
                      decoding="async"
                    />
                    <div className="content">
                      <p>{data.description}</p>
                      <a
                        href="#/"
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedImg(data.link);
                        }}
                      >
                        view project
                      </a>
                    </div>
                  </div>
                </Carousel.Item>
              );
            })}
          </Carousel>
        </div>
        <div className="mb-5 po_items_ho">
          {dataportfolio.map((data, i) => {
            const images = getPortfolioImagePaths(data.img);

            return (
              <div key={i} className="po_item">
                <img
                  className="po_item__image"
                  src={images.thumb}
                  srcSet={`${images.thumb} 480w, ${images.medium} 800w`}
                  sizes="(max-width: 768px) 354px, 480px"
                  alt={data.description}
                  loading="lazy"
                  decoding="async"
                />
                <div className="content">
                  <p>{data.description}</p>
                  <a
                    href="#/"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedImg(data.link);
                    }}
                  >
                    view project
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {selectedImg && (
          <div
            className="portfolio-lightbox"
            onClick={() => setSelectedImg(null)}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setSelectedImg(null);
              }
            }}
            role="button"
            tabIndex={0}
            aria-label="Close full size image"
          >
            <span className="portfolio-lightbox__close" aria-hidden="true">
              ✕
            </span>

            <img
              src={selectedImg}
              alt="Full size portfolio image"
              className="portfolio-lightbox__image"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </Container>
    </HelmetProvider>
  );
};
