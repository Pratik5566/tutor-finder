import React from 'react'
import { Typography, Accordion, AccordionDetails, AccordionSummary, Button } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useNavigate } from 'react-router-dom';

import './Faq.css'

const Faq = () => {
  const navigate = useNavigate();
  
  return (
    <div className='faq-container--1'> 
      <div className='faq-container0'>
        <div className="faq-container1">
          <Typography sx={{ fontWeight: 400, fontSize: 40, marginBottom: "1%", color: "#413F42" }}>FAQ </Typography>
          <Typography sx={{ fontWeight: 400, fontSize: 20, marginBottom: "1%", color: "#413F42" }}>Need Help?</Typography>
        </div>
        <div className="faq-container2" style={{ overflowY: 'auto' }}>
          <Accordion sx={{ marginBottom: "1%" }} classes={{ root: 'accordion-root' }}>  
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
              classes={{ root: 'accordion-summary', expanded: 'accordion-summary-expanded' }}
            >
              <Typography>How does the website work?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Our website allows students to search for tutors based on their subject preferences, location, mode, and other criteria. Once you find a suitable tutor, you can contact him and start your learning.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{ marginBottom: "1%" }} classes={{ root: 'accordion-root' }}>
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
              classes={{ root: 'accordion-summary', expanded: 'accordion-summary-expanded' }}
            >
              <Typography>What subjects are available for tutoring?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                We offer tutoring services for a wide range of subjects for graduates and postgraduates, including math, science, language arts, history, music, art, computer programming, and more. You can search for tutors in specific subjects using our search filters.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{ marginBottom: "1%" }} classes={{ root: 'accordion-root' }}>
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon />}
              aria-controls="panel3-content"
              id="panel3-header"
              classes={{ root: 'accordion-summary', expanded: 'accordion-summary-expanded' }}
            >
              <Typography>Are the tutors qualified and experienced?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Yes, we carefully vet all tutors before they join our platform to ensure they meet our standards for qualifications and experience. Tutors typically have relevant academic credentials, teaching experience, and expertise in their respective subjects.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{ marginBottom: "1%" }} classes={{ root: 'accordion-root' }}>
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon />}
              aria-controls="panel4-content"
              id="panel4-header"
              classes={{ root: 'accordion-summary', expanded: 'accordion-summary-expanded' }}
            >
              <Typography>How are payments processed?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Payments for tutoring sessions are processed securely through our platform using trusted payment gateways. You can make payments using credit/debit cards, PayPal, or other accepted payment methods.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{ marginBottom: "1%" }} classes={{ root: 'accordion-root' }}>
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon />}
              aria-controls="panel5-content"
              id="panel5-header"
              classes={{ root: 'accordion-summary', expanded: 'accordion-summary-expanded' }}
            >
              <Typography>Is there a fee for using the tutor finder website?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Our platform is free for students to use for searching and browsing tutor profiles. However, there may be fees for tutors for using our service.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
      <div className="faq-container3">
        <div className="faq-container3-1">
          <Typography sx={{ fontWeight: 400, fontSize: 15, marginBottom: "1%", color: "#413F42" }}>Still Have Questions? </Typography>
          <Typography sx={{ fontWeight: 400, fontSize: 13, marginBottom: "1%", color: "#413F42" }}>Can't find the answers you're looking for?</Typography>
        </div>
        <div className="faq-container3-2">
          <Button sx={{ borderRadius: "15px", backgroundColor:"#413F42", marginTop: "2%", color: "white", ":hover": { color: "black", backgroundColor: "#F5F5F5", border: "1px solid black" } }} onClick={() => {navigate('/contact-us')}}>Get in touch</Button>
        </div>
      </div>
    </div>
  )
}

export default Faq;
