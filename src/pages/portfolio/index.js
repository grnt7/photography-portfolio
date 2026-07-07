import React, { useState } from "react"; // 1. Imported useState
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import { dataportfolio, meta } from "../../content_option";

export const Portfolio = () => {
  // 2. Created state to track the active full-size image link
  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <HelmetProvider>
      <Container className="About-header">
        <Helmet>
          <meta charSet="utf-8" />
          <title> Portfolio | {meta.title} </title>{" "}
          <meta name="description" content={meta.description} />
        </Helmet>
        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg="8">
            <h1 className="display-4 mb-4"> Portfolio </h1>{" "}
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>
        <div className="mb-5 po_items_ho">
          {dataportfolio.map((data, i) => {
            return (
              <div key={i} className="po_item">
                <img src={data.img} alt="" />
                <div className="content">
                  <p>{data.description}</p>
                  {/* 3. Updated this link to capture the click and open the lightbox */}
                  <a 
                    href="#/" 
                    onClick={(e) => {
                      e.preventDefault(); // Keeps the page from jumping around
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

        {/* 4. The Lightbox Overlay (Only appears when selectedImg has a value) */}
        {selectedImg && (
          <div 
            onClick={() => setSelectedImg(null)} // Closes the image if you click anywhere on the background
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(0, 0, 0, 0.95)', // Deep dark overlay for premium photo contrast
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 99999, // Ensures it sits perfectly on top of Bootstrap headers/navbars
              cursor: 'pointer'
            }}
          >
            {/* Close 'X' Button icon */}
            <span style={{ 
              position: 'absolute', 
              top: '20px', 
              right: '30px', 
              color: '#fff', 
              fontSize: '35px',
              fontWeight: '200',
              fontFamily: 'sans-serif'
            }}>
              ✕
            </span>
            
            {/* The Fully Opened Image */}
            <img 
              src={selectedImg} 
              alt="Full view project" 
              style={{ 
                maxWidth: '90%', 
                maxHeight: '90%', 
                objectFit: 'contain',
                boxShadow: '0px 0px 25px rgba(0,0,0,0.5)',
                borderRadius: '4px'
              }} 
            />
          </div>
        )}
      </Container>
    </HelmetProvider>
  );
};