import type { Program } from "@/types";

/**
 * Single source of truth for the 11-program catalog. Every nav dropdown, filter,
 * form <select>, program page, and related-program card reads from this array.
 *
 * Verified against nghi-omega.vercel.app/programs/<slug> (the live site):
 *   officialName, blurb, description, duration, format, objectives,
 *   outlook (employment rate, salary range, growth, career opportunities).
 * Also sourced from the live objectives: MBC's CPC/CBCS prep, MRI's ARRT prep,
 * MA's CMA/RMA prep.
 *
 * Photos for nursing-assistant, patient-care-technician, medical-administrative-
 * assistant, medical-billing-coding, mental-health-technician, orthopedic-casting,
 * and physical-therapy-aide are free-license Unsplash stock (unsplash.com/license)
 * — replace with real campus photography when available.
 *
 * Sample content pending real material from the client: modules (accordion
 * copy expanding each real objective), skills, handsOn, studentQuote, and the
 * certification exam/body where the live site doesn't name one.
 */
export const programs: Program[] = [
  {
    slug: "medical-assistant",
    name: "Medical Assistant",
    officialName: "Medical Assistant Program",
    shortName: "Medical Assistant",
    category: "clinical",
    duration: "12 weeks full-time or 24 weeks part-time",
    durationWeeks: [12, 24],
    format: "hybrid",
    credential: "CMA & RMA Certification Prep",
    blurb: "Vital members of the medical team, skilled in both patient care and administrative tasks.",
    description: [
      "Become a vital member of the medical team with our comprehensive Medical Assistant Program. Medical Assistants are the backbone of clinical teams — skilled in both patient care and administrative tasks. From taking vital signs to managing medical records, they ensure healthcare runs smoothly and compassionately.",
    ],
    heroImage: "/images/programs/medical-assistant-card.jpg",
    cardImage: "/images/programs/medical-assistant-card.jpg",
    objectives: [
      "Medical terminology, anatomy, patient care",
      "Clinical & administrative skills",
      "Phlebotomy, orthopedic casting, diagnostic testing",
      "Vital signs, injections, EKGs, sterilization",
      "CMA (Certified Medical Assistant) certification prep",
      "RMA (Registered Medical Assistant) certification prep",
    ],
    modules: [
      {
        title: "Foundations of Healthcare",
        detail: "Medical terminology, anatomy, and workplace safety — the shared vocabulary every clinical task builds on.",
      },
      {
        title: "Clinical Skills",
        detail: "Vitals, patient preparation, and infection-control protocols you'll use in every patient interaction.",
      },
      {
        title: "Phlebotomy & Lab Procedures",
        detail: "Venipuncture technique, specimen collection and handling, and lab safety standards.",
      },
      {
        title: "EKG & Diagnostic Procedures",
        detail: "Electrocardiogram administration, basic rhythm recognition, and supporting diagnostic testing.",
      },
      {
        title: "Administrative Skills",
        detail: "Patient records, scheduling, insurance basics, and HIPAA-compliant documentation.",
      },
      {
        title: "Certification Preparation",
        detail: "Structured review and practice testing for the CMA and RMA exams, through exam day.",
      },
    ],
    skills: ["Patient Vitals", "EKG Basics", "Phlebotomy", "Clinical Procedures", "Medical Terminology", "Patient Communication"],
    handsOn: ["EKG", "Phlebotomy", "Vitals", "Patient Care"],
    studentQuote:
      "I came in with no healthcare experience and left confident enough to start my first clinical role.",
    certification: { exam: "CMA & RMA Certification", body: "AMCA", onCampus: true },
    outlook: {
      employmentRate: "95%+",
      salaryRange: "$35,000 - $50,000",
      growth: "Above Average",
      environments: ["Physician Offices", "Hospitals", "Outpatient Clinics", "Urgent Care Centers", "Specialty Practices"],
    },
    relatedSlugs: ["nursing-assistant", "medical-billing-coding"],
  },
  {
    slug: "nursing-assistant",
    name: "Nursing Assistant",
    officialName: "Nursing Assistant Certification (NAC)",
    shortName: "CNA",
    category: "clinical",
    duration: "8–12 weeks",
    durationWeeks: [8, 12],
    format: "hybrid",
    credential: "Nursing Assistant Certification (NAC)",
    blurb: "The heart of healthcare, providing compassionate care and support to patients.",
    description: [
      "Nursing Assistants are the heart of healthcare, providing compassionate care and support to patients in hospitals, nursing homes, and long-term care facilities. They ensure comfort and safety while working closely with nurses and physicians.",
    ],
    heroImage: "/images/programs/nursing-assistant.jpg",
    cardImage: "/images/programs/nursing-assistant.jpg",
    objectives: [
      "Basic nursing skills and patient care techniques",
      "Infection control and safety procedures",
      "Effective communication with patients and families",
      "Vital signs measurement and monitoring",
      "Assisting with activities of daily living",
      "Legal and ethical considerations in nursing care",
    ],
    modules: [
      {
        title: "Basic Nursing Skills & Patient Care",
        detail: "Bed-making, positioning, hygiene, and the everyday care techniques patients depend on.",
      },
      {
        title: "Infection Control & Safety",
        detail: "Standard precautions, hand hygiene, PPE, and fall prevention in every care setting.",
      },
      {
        title: "Communicating with Patients & Families",
        detail: "Therapeutic communication, reporting changes in condition, and supporting families with empathy.",
      },
      {
        title: "Vital Signs & Monitoring",
        detail: "Temperature, pulse, respiration, blood pressure, and accurate intake/output recording.",
      },
      {
        title: "Activities of Daily Living",
        detail: "Safe transfers, mobility support, feeding, dressing, and grooming assistance.",
      },
      {
        title: "Legal & Ethical Care",
        detail: "Resident rights, scope of practice, HIPAA, and documentation standards.",
      },
    ],
    skills: ["Patient Care", "Vital Signs", "Infection Control", "Safe Transfers", "Daily Living Support", "Patient Communication"],
    handsOn: ["Vitals", "Transfers", "Hygiene Care", "Infection Control"],
    studentQuote:
      "The clinical practice made all the difference — on my first day at work, none of it felt new.",
    certification: { exam: "Nursing Assistant Certification", body: "Texas Health & Human Services", onCampus: true },
    outlook: {
      employmentRate: "95%+",
      salaryRange: "$35,000 - $50,000",
      growth: "Above Average",
      environments: ["Hospitals", "Long-Term Care Facilities", "Nursing Homes", "Rehabilitation Centers", "Home Health Care"],
    },
    relatedSlugs: ["patient-care-technician", "medical-assistant", "phlebotomy-technician"],
  },
  {
    slug: "phlebotomy-technician",
    name: "Phlebotomy Technician",
    officialName: "Phlebotomy Training",
    shortName: "Phlebotomy",
    category: "clinical",
    duration: "6–10 weeks",
    durationWeeks: [6, 10],
    format: "hybrid",
    credential: "Certified Phlebotomy Technician (CPT)",
    blurb: "Critical medical skill focusing on blood collection for diagnostic tests and medical procedures.",
    description: [
      "Phlebotomy is a critical skill in the medical field, focusing on drawing blood for diagnostic tests, transfusions, research, and blood donations. Our Phlebotomy Training Program equips you with the knowledge and hands-on experience needed to excel in this growing field.",
    ],
    heroImage: "/images/programs/phlebotomy-card.jpg",
    cardImage: "/images/programs/phlebotomy-card.jpg",
    objectives: [
      "Anatomy, physiology, and medical terminology",
      "Blood collection techniques, venipuncture and capillary puncture",
      "Patient care, safety, and infection control",
      "Specimen handling and processing",
      "Professional ethics and standards",
      "Certification exam preparation",
    ],
    modules: [
      {
        title: "Anatomy, Physiology & Terminology",
        detail: "The circulatory system, vein selection, and the medical vocabulary used on every lab requisition.",
      },
      {
        title: "Venipuncture & Capillary Puncture",
        detail: "Vacuum-tube, butterfly, and dermal techniques, plus correct order of draw.",
      },
      {
        title: "Patient Care, Safety & Infection Control",
        detail: "Patient identification, managing anxious patients, and OSHA bloodborne-pathogen standards.",
      },
      {
        title: "Specimen Handling & Processing",
        detail: "Labeling, centrifuging, and routing specimens so results come back accurate.",
      },
      {
        title: "Professional Ethics & Standards",
        detail: "Scope of practice, patient privacy, and professional conduct in lab settings.",
      },
      {
        title: "Certification Exam Preparation",
        detail: "Structured review and timed practice exams ahead of your certification test.",
      },
    ],
    skills: ["Venipuncture", "Capillary Puncture", "Order of Draw", "Specimen Handling", "Infection Control", "Patient Safety"],
    handsOn: ["Venipuncture", "Order of Draw", "Specimen Processing", "Safety"],
    studentQuote: "By my externship I'd already done enough practice draws that the real ones felt routine.",
    certification: { exam: "Certified Phlebotomy Technician (CPT)", body: "AMCA", onCampus: true },
    outlook: {
      employmentRate: "95%+",
      salaryRange: "$35,000 - $50,000",
      growth: "Above Average",
      environments: ["Hospitals", "Diagnostic Labs", "Blood Donation Centers", "Physician Offices", "Research Facilities"],
    },
    relatedSlugs: ["ekg-technician", "medical-assistant", "patient-care-technician"],
  },
  {
    slug: "ekg-technician",
    name: "EKG Technician",
    officialName: "Electrocardiogram (EKG) Technician",
    shortName: "EKG Technician",
    category: "clinical",
    duration: "8–12 weeks",
    durationWeeks: [8, 12],
    format: "hybrid",
    credential: "EKG Technician Certification",
    blurb: "Essential healthcare team members responsible for conducting diagnostic tests that monitor heart function.",
    description: [
      "EKG Technicians are essential members of the healthcare team, responsible for conducting diagnostic tests that monitor heart function. They ensure accurate readings, assist in detecting cardiac conditions, and support physicians in delivering timely, life-saving care.",
    ],
    heroImage: "/images/programs/ekg-technician-card.jpg",
    cardImage: "/images/programs/ekg-technician-card.jpg",
    objectives: [
      "Anatomy and physiology of the heart",
      "EKG equipment operation and maintenance",
      "Patient preparation and communication",
      "Reading and interpreting EKG results",
      "Identifying arrhythmias and other cardiac conditions",
    ],
    modules: [
      {
        title: "Anatomy & Physiology of the Heart",
        detail: "Cardiac structure and the electrical conduction system behind every waveform.",
      },
      {
        title: "EKG Equipment Operation & Maintenance",
        detail: "12-lead setup, Holter and event monitors, calibration, and troubleshooting artifact.",
      },
      {
        title: "Patient Preparation & Communication",
        detail: "Skin prep, accurate lead placement, and keeping patients calm and still during the test.",
      },
      {
        title: "Reading & Interpreting EKG Results",
        detail: "Measuring intervals, calculating heart rate, and recognizing a normal sinus rhythm.",
      },
      {
        title: "Arrhythmias & Cardiac Conditions",
        detail: "Spotting common arrhythmias and knowing when a strip needs immediate physician attention.",
      },
    ],
    skills: ["12-Lead Placement", "Rhythm Recognition", "Holter Monitoring", "Cardiac Anatomy", "Patient Prep", "Arrhythmia ID"],
    handsOn: ["12-Lead EKG", "Holter Monitors", "Rhythm Strips", "Patient Prep"],
    studentQuote: "Reading rhythm strips went from impossible to second nature — the lab practice was relentless in the best way.",
    certification: { exam: "EKG Technician Certification", body: "AMCA", onCampus: true },
    outlook: {
      employmentRate: "95%+",
      salaryRange: "$35,000 - $50,000",
      growth: "Above Average",
      environments: ["Hospitals", "Clinics", "Diagnostic Labs", "Cardiology Offices"],
    },
    relatedSlugs: ["patient-care-technician", "medical-assistant", "phlebotomy-technician"],
  },
  {
    slug: "patient-care-technician",
    name: "Patient Care Technician",
    officialName: "Patient Care Technician Certification (PCTC)",
    shortName: "PCT",
    category: "clinical",
    duration: "12–16 weeks",
    durationWeeks: [12, 16],
    format: "hybrid",
    credential: "Patient Care Technician Certification (PCTC)",
    blurb: "Deliver compassionate care under supervision of nurses and physicians.",
    description: [
      "Patient Care Technicians work under the supervision of nurses and physicians, delivering compassionate care and supporting patients with daily activities, vital sign monitoring, and basic medical procedures. They play a crucial role in ensuring quality care and comfort.",
    ],
    heroImage: "/images/programs/patient-care-technician.jpg",
    cardImage: "/images/programs/patient-care-technician.jpg",
    objectives: [
      "Basic nursing and patient care techniques",
      "Phlebotomy and specimen collection",
      "Electrocardiogram (EKG) monitoring",
      "Infection control and safety protocols",
      "Patient hygiene and mobility assistance",
      "Effective communication with patients and families",
    ],
    modules: [
      {
        title: "Basic Nursing & Patient Care",
        detail: "Core bedside care, vital signs, and supporting nurses through a hospital shift.",
      },
      {
        title: "Phlebotomy & Specimen Collection",
        detail: "Venipuncture, capillary sticks, and correct specimen labeling and handling.",
      },
      {
        title: "EKG Monitoring",
        detail: "Lead placement, running 12-lead EKGs, and recognizing strips that need escalation.",
      },
      {
        title: "Infection Control & Safety",
        detail: "Isolation precautions, PPE, sharps safety, and fall prevention.",
      },
      {
        title: "Hygiene & Mobility Assistance",
        detail: "Bathing, repositioning, safe transfers, and ambulation support.",
      },
      {
        title: "Communicating with Patients & Families",
        detail: "Clear, compassionate communication and accurate reporting to the care team.",
      },
    ],
    skills: ["Patient Care", "Phlebotomy", "EKG Monitoring", "Vital Signs", "Mobility Assistance", "Infection Control"],
    handsOn: ["Phlebotomy", "EKG", "Vitals", "Patient Mobility"],
    studentQuote: "Learning phlebotomy, EKG, and patient care in one program made me the most versatile tech on my unit.",
    certification: { exam: "Patient Care Technician Certification (PCTC)", body: "AMCA", onCampus: true },
    outlook: {
      employmentRate: "95%+",
      salaryRange: "$35,000 - $50,000",
      growth: "Above Average",
      environments: ["Hospitals", "Long-Term Care Facilities", "Rehabilitation Centers", "Dialysis Centers", "Home Health Care"],
    },
    relatedSlugs: ["nursing-assistant", "phlebotomy-technician", "ekg-technician"],
  },
  {
    slug: "mri-technician",
    name: "MRI Technician",
    officialName: "Magnetic Resonance Imaging (MRI) Program",
    shortName: "MRI Tech",
    category: "clinical",
    duration: "16–24 weeks",
    durationWeeks: [16, 24],
    format: "hybrid",
    credential: "ARRT MRI Certification Prep",
    blurb: "Join the cutting edge of diagnostic imaging with comprehensive MRI technology training.",
    description: [
      "Join the cutting edge of diagnostic imaging with our Magnetic Resonance Imaging (MRI) Program. Whether you're launching your career or expanding your skills, this program prepares you with the technical knowledge and hands-on experience to operate MRI equipment, capture high-quality images, and support accurate diagnoses in today's advanced medical environments.",
    ],
    heroImage: "/images/story/step-3.jpg",
    cardImage: "/images/story/step-3.jpg",
    objectives: [
      "MRI Physics and Instrumentation",
      "Cross-Sectional Anatomy",
      "Patient Care and Safety",
      "Clinical Competency in MRI Protocols",
      "Image quality and optimization",
      "ARRT MRI certification preparation",
    ],
    modules: [
      {
        title: "MRI Physics & Instrumentation",
        detail: "Magnetic fields, RF pulses, and how the scanner turns signal into an image.",
      },
      {
        title: "Cross-Sectional Anatomy",
        detail: "Recognizing anatomy across axial, sagittal, and coronal planes.",
      },
      {
        title: "Patient Care & Safety",
        detail: "MRI screening, zone safety, implants and contraindications, and patient comfort in the bore.",
      },
      {
        title: "Clinical Competency in MRI Protocols",
        detail: "Running standard protocols for brain, spine, and musculoskeletal exams.",
      },
      {
        title: "Image Quality & Optimization",
        detail: "Adjusting parameters, reducing artifacts, and producing diagnostic-quality images.",
      },
      {
        title: "ARRT MRI Certification Preparation",
        detail: "Structured review and practice exams aligned to the ARRT MRI content outline.",
      },
    ],
    skills: ["MRI Physics", "Cross-Sectional Anatomy", "MRI Safety", "Scan Protocols", "Image Optimization", "Patient Screening"],
    handsOn: ["MRI Protocols", "Safety Screening", "Patient Positioning", "Image Review"],
    studentQuote: "I was expanding from another healthcare role, and the physics finally clicked once I was running protocols myself.",
    certification: { exam: "ARRT MRI Certification", body: "ARRT", onCampus: false },
    outlook: {
      employmentRate: "95%+",
      salaryRange: "$35,000 - $50,000",
      growth: "Above Average",
      environments: ["Hospitals", "Outpatient Imaging Centers", "Research Facilities", "Diagnostic Centers", "Academic Medical Centers"],
    },
    relatedSlugs: ["patient-care-technician", "medical-assistant", "ekg-technician"],
  },
  {
    slug: "medical-administrative-assistant",
    name: "Medical Administrative Assistant",
    officialName: "Medical Administrative Assistant Certification (MAAC)",
    shortName: "MAAC",
    category: "administrative",
    duration: "8–16 weeks",
    durationWeeks: [8, 16],
    format: "hybrid",
    credential: "Medical Administrative Assistant Certification (MAAC)",
    blurb: "The backbone of healthcare facilities, managing essential tasks like patient scheduling and record keeping.",
    description: [
      "Medical Administrative Assistants are the backbone of healthcare facilities, managing essential tasks like patient scheduling, record keeping, and insurance claims. They ensure smooth office operations, allowing clinicians to focus on patient care.",
    ],
    heroImage: "/images/programs/medical-administrative-assistant.jpg",
    cardImage: "/images/programs/medical-administrative-assistant.jpg",
    objectives: [
      "Medical office procedures and best practices",
      "Patient communication and customer service",
      "Electronic health records (EHR) management",
      "Medical terminology and basic coding",
      "Insurance and billing processes",
      "Professionalism and ethical standards in healthcare",
    ],
    modules: [
      {
        title: "Medical Office Procedures",
        detail: "Scheduling, patient check-in and check-out, and keeping a busy front office running smoothly.",
      },
      {
        title: "Patient Communication & Service",
        detail: "Phone etiquette, handling difficult conversations, and making every patient feel looked after.",
      },
      {
        title: "Electronic Health Records (EHR)",
        detail: "Navigating EHR systems, updating charts, and protecting patient data under HIPAA.",
      },
      {
        title: "Medical Terminology & Basic Coding",
        detail: "The vocabulary of medicine and an introduction to ICD-10 and CPT codes.",
      },
      {
        title: "Insurance & Billing Processes",
        detail: "Verifying coverage, submitting claims, and following up on patient balances.",
      },
      {
        title: "Professionalism & Ethics",
        detail: "Confidentiality, workplace conduct, and ethical standards in a healthcare office.",
      },
    ],
    skills: ["Scheduling", "EHR Systems", "Insurance Verification", "Medical Terminology", "Billing Basics", "Front-Office Service"],
    handsOn: ["EHR Software", "Scheduling", "Insurance Claims", "Patient Intake"],
    handsOnIntro:
      "Every skill in this program is practiced in the same EHR, scheduling, and claims software used in real medical offices — so your first day at the front desk already feels familiar.",
    studentQuote: "I wanted a healthcare career without clinical work — now I run the front desk of a busy specialty practice.",
    certification: { exam: "Medical Administrative Assistant Certification (MAAC)", body: "AMCA", onCampus: true },
    outlook: {
      employmentRate: "95%+",
      salaryRange: "$35,000 - $50,000",
      growth: "Above Average",
      environments: ["Hospitals", "Private Practices", "Outpatient Clinics", "Specialty Offices", "Insurance Companies"],
    },
    relatedSlugs: ["medical-billing-coding", "medical-assistant", "mental-health-technician"],
  },
  {
    slug: "medical-billing-coding",
    name: "Medical Billing & Coding",
    officialName: "Medical Billing and Coding",
    shortName: "Billing & Coding",
    category: "administrative",
    duration: "12–20 weeks",
    durationWeeks: [12, 20],
    format: "flexible",
    credential: "CPC & CBCS Certification Prep",
    blurb: "Vital role in healthcare ensuring accurate documentation, proper billing, and seamless insurance processing.",
    description: [
      "Step into a vital role in the healthcare system with our comprehensive Medical Billing and Coding Program. Medical Billing and Coding professionals play a vital role in the healthcare system ensuring accurate documentation, proper billing, and seamless insurance processing.",
    ],
    heroImage: "/images/programs/medical-billing-coding.jpg",
    cardImage: "/images/programs/medical-billing-coding.jpg",
    objectives: [
      "Medical terminology, anatomy, coding systems",
      "ICD-10, CPT, HCPCS coding systems",
      "Electronic health records (EHRs)",
      "Healthcare regulations",
      "Real-world billing and coding software experience",
      "CPC and CBCS certification preparation",
    ],
    modules: [
      {
        title: "Terminology, Anatomy & Coding Systems",
        detail: "The medical language and body systems every code is built on.",
      },
      {
        title: "ICD-10, CPT & HCPCS",
        detail: "Assigning diagnosis, procedure, and supply codes accurately from real documentation.",
      },
      {
        title: "Electronic Health Records",
        detail: "Pulling the right information from EHRs and keeping records audit-ready.",
      },
      {
        title: "Healthcare Regulations",
        detail: "HIPAA, compliance, and the payer rules that decide whether a claim gets paid.",
      },
      {
        title: "Billing & Coding Software",
        detail: "Hands-on practice with the claim submission and practice-management tools employers use.",
      },
      {
        title: "CPC & CBCS Certification Preparation",
        detail: "Structured review and timed practice exams for the CPC and CBCS credentials.",
      },
    ],
    skills: ["ICD-10", "CPT", "HCPCS", "Claims Submission", "EHR Systems", "HIPAA Compliance"],
    handsOn: ["ICD-10", "CPT", "Claims Software", "EHR"],
    handsOnIntro:
      "Every code set in this program is practiced on real billing and coding software with real-world case documentation — so by exam day, the workflow already feels familiar.",
    studentQuote: "Taking the program online around my job meant I didn't have to choose between a paycheck and a new career.",
    certification: { exam: "CPC & CBCS", body: "AAPC and NHA", onCampus: false },
    outlook: {
      employmentRate: "95%+",
      salaryRange: "$35,000 - $50,000",
      growth: "Above Average",
      environments: [
        "Hospitals",
        "Physician Offices",
        "Outpatient Clinics",
        "Insurance Companies",
        "Long-Term Care Facilities",
        "Government Agencies",
      ],
    },
    relatedSlugs: ["medical-administrative-assistant", "medical-assistant", "mental-health-technician"],
  },
  {
    slug: "mental-health-technician",
    name: "Mental Health Technician",
    officialName: "Mental Health Technician Certification (MHTC)",
    shortName: "MHTC",
    category: "specialized",
    duration: "8–16 weeks",
    durationWeeks: [8, 16],
    format: "hybrid",
    credential: "Mental Health Technician Certification (MHTC)",
    blurb: "Work alongside mental health professionals providing compassionate support and promoting safe recovery environments.",
    description: [
      "Mental Health Technicians work alongside psychiatrists, psychologists, and social workers, providing compassionate support, monitoring patient behavior, and promoting a safe environment for recovery.",
    ],
    heroImage: "/images/programs/mental-health-technician.jpg",
    cardImage: "/images/programs/mental-health-technician.jpg",
    objectives: [
      "Fundamentals of mental health and psychiatric disorders",
      "Crisis prevention and intervention techniques",
      "Therapeutic communication and patient interaction",
      "Basic counseling skills and supportive therapies",
      "Ethical and legal considerations in mental health",
      "Documentation and record-keeping",
    ],
    modules: [
      {
        title: "Mental Health & Psychiatric Disorders",
        detail: "Common diagnoses, symptoms, and how treatment teams approach recovery.",
      },
      {
        title: "Crisis Prevention & Intervention",
        detail: "De-escalation, recognizing warning signs, and keeping patients and staff safe.",
      },
      {
        title: "Therapeutic Communication",
        detail: "Active listening, building trust, and interacting with patients in distress.",
      },
      {
        title: "Counseling Skills & Supportive Therapies",
        detail: "Supporting group sessions, activities, and the therapeutic plan set by clinicians.",
      },
      {
        title: "Ethical & Legal Considerations",
        detail: "Patient rights, confidentiality, and the legal boundaries of the role.",
      },
      {
        title: "Documentation & Record-Keeping",
        detail: "Behavior observations, incident reports, and accurate charting.",
      },
    ],
    skills: ["Crisis Intervention", "De-escalation", "Therapeutic Communication", "Behavior Monitoring", "Patient Advocacy", "Documentation"],
    handsOn: ["De-escalation", "Role-Play Scenarios", "Group Support", "Charting"],
    handsOnIntro:
      "Every skill in this program is practiced through guided role-play and realistic crisis scenarios with instructor feedback — so by your first shift, de-escalation already feels familiar.",
    studentQuote: "The crisis-intervention practice gave me the calm I needed for my first shifts on a behavioral health unit.",
    certification: { exam: "Mental Health Technician Certification (MHTC)", body: "AMCA", onCampus: true },
    outlook: {
      employmentRate: "95%+",
      salaryRange: "$35,000 - $50,000",
      growth: "Above Average",
      environments: [
        "Behavioral Health Centers",
        "Psychiatric Hospitals",
        "Residential Treatment Facilities",
        "Substance Abuse Treatment Centers",
        "Community Mental Health Programs",
      ],
    },
    relatedSlugs: ["patient-care-technician", "medical-administrative-assistant", "nursing-assistant"],
  },
  {
    slug: "orthopedic-casting",
    name: "Orthopedic Casting",
    officialName: "Orthopedic Casting Program for Medical Assistants",
    shortName: "Orthopedic Casting",
    category: "specialized",
    duration: "2 weeks",
    durationWeeks: [2, 2],
    format: "in-person",
    credential: "Orthopedic Casting Certificate",
    blurb: "Specialized training in orthopedic cast application, maintenance, and removal for medical assistants.",
    description: [
      "This specialized program trains Medical Assistants in the application, maintenance, and removal of orthopedic casts and splints. Gain hands-on skills to support orthopedic teams in clinical and emergency settings.",
    ],
    heroImage: "/images/programs/orthopedic-casting.jpg",
    cardImage: "/images/programs/orthopedic-casting.jpg",
    objectives: [
      "Intro to orthopedic conditions and anatomy",
      "Upper & lower extremity casting techniques",
      "Specialized casts (hip, shoulder spica)",
      "Cast removal using saws safely",
      "Tools & materials training",
      "Clinical scenarios & certification",
    ],
    modules: [
      {
        title: "Orthopedic Conditions & Anatomy",
        detail: "Fractures, sprains, and the musculoskeletal anatomy behind every cast.",
      },
      {
        title: "Upper & Lower Extremity Casting",
        detail: "Short- and long-arm and leg casts, splints, and correct padding and positioning.",
      },
      {
        title: "Specialized Casts",
        detail: "Hip and shoulder spica casts and other complex applications.",
      },
      {
        title: "Safe Cast Removal",
        detail: "Using the cast saw safely, protecting skin, and patient reassurance.",
      },
      {
        title: "Tools & Materials",
        detail: "Plaster versus fiberglass, padding, and choosing the right materials for each case.",
      },
      {
        title: "Clinical Scenarios & Certification",
        detail: "Real-world casting scenarios assessed by instructors, leading to certification.",
      },
    ],
    skills: ["Cast Application", "Splinting", "Spica Casts", "Cast Removal", "Musculoskeletal Anatomy", "Patient Education"],
    handsOn: ["Fiberglass Casts", "Splints", "Cast Saw", "Spica Casts"],
    studentQuote: "Two weeks, and I went back to my clinic able to handle casting that we used to refer out.",
    certification: { exam: "Orthopedic Casting Certificate Exam", body: "NAOT", onCampus: false },
    outlook: {
      employmentRate: "95%+",
      salaryRange: "$35,000 - $50,000",
      growth: "Above Average",
      environments: [
        "Orthopedic Clinics",
        "Emergency Departments",
        "Urgent Care Centers",
        "Sports Medicine Facilities",
        "Rehabilitation Centers",
      ],
    },
    relatedSlugs: ["medical-assistant", "physical-therapy-aide", "patient-care-technician"],
  },
  {
    slug: "physical-therapy-aide",
    name: "Physical Therapy Aide",
    officialName: "Physical Therapy Technician/Aide Certification (PTTC)",
    shortName: "PT Aide",
    category: "clinical",
    duration: "8–12 weeks",
    durationWeeks: [8, 12],
    format: "hybrid",
    credential: "Physical Therapy Technician/Aide Certification (PTTC)",
    blurb: "Support patients in rehabilitation by providing encouragement and assisting with therapy tasks.",
    description: [
      "Physical Therapy Technicians/Aides support patients in rehabilitation by providing encouragement, monitoring exercise programs, and assisting with basic therapy tasks. They are instrumental in helping patients recover strength, function, and independence.",
    ],
    heroImage: "/images/programs/physical-therapy-aide.jpg",
    cardImage: "/images/programs/physical-therapy-aide.jpg",
    objectives: [
      "Principles of physical therapy and rehabilitation",
      "Patient positioning, transfers, and mobility assistance",
      "Exercise and treatment techniques",
      "Safety and infection control in therapy settings",
      "Communication with patients and healthcare team",
      "Professionalism and ethical standards in patient care",
    ],
    modules: [
      {
        title: "Principles of Physical Therapy",
        detail: "How rehabilitation works and the aide's role within the therapy team.",
      },
      {
        title: "Positioning, Transfers & Mobility",
        detail: "Gait belts, wheelchairs, walkers, and moving patients safely.",
      },
      {
        title: "Exercise & Treatment Techniques",
        detail: "Setting up exercise programs, hot/cold packs, and supporting therapist-led treatments.",
      },
      {
        title: "Safety & Infection Control",
        detail: "Equipment cleaning, fall prevention, and safe therapy environments.",
      },
      {
        title: "Communicating with Patients & the Team",
        detail: "Motivating patients through recovery and reporting progress to therapists.",
      },
      {
        title: "Professionalism & Ethics",
        detail: "Scope of practice, confidentiality, and professional conduct in patient care.",
      },
    ],
    skills: ["Patient Transfers", "Mobility Assistance", "Exercise Programs", "Therapy Equipment", "Fall Prevention", "Patient Motivation"],
    handsOn: ["Transfers", "Gait Training", "Exercise Setup", "Therapy Equipment"],
    studentQuote: "Helping someone take their first steps after surgery is the best part of my day — the program got me there fast.",
    certification: { exam: "Physical Therapy Technician/Aide Certification (PTTC)", body: "AMCA", onCampus: true },
    outlook: {
      employmentRate: "95%+",
      salaryRange: "$35,000 - $50,000",
      growth: "Above Average",
      environments: [
        "Physical Therapy Clinics",
        "Hospitals",
        "Rehabilitation Centers",
        "Sports Medicine Facilities",
        "Long-Term Care Centers",
      ],
    },
    relatedSlugs: ["orthopedic-casting", "patient-care-technician", "nursing-assistant"],
  },
];

export function getProgramBySlug(slug: string): Program | undefined {
  return programs.find((p) => p.slug === slug);
}

export function getRelatedPrograms(program: Program): Program[] {
  return program.relatedSlugs
    .map((slug) => getProgramBySlug(slug))
    .filter((p): p is Program => Boolean(p));
}

export const programCategories: { value: Program["category"] | "all"; label: string }[] = [
  { value: "all", label: "All Programs" },
  { value: "clinical", label: "Clinical" },
  { value: "administrative", label: "Administrative" },
  { value: "specialized", label: "Specialized" },
];
