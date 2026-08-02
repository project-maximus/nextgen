import type { Program } from "@/types";

/**
 * Single source of truth for the 11-program catalog. Every nav dropdown, filter,
 * form <select>, and related-program card must read from this array — never a
 * separate hard-coded list. Durations/formats match the confirmed catalog exactly.
 *
 * Curriculum outcomes, outlook figures, and tuition notes are realistic sample
 * data pending real figures from the client; they are structured so real data
 * is a drop-in replacement, never inline copy in a component.
 */
export const programs: Program[] = [
  {
    slug: "medical-assistant",
    name: "Medical Assistant",
    shortName: "Medical Assistant",
    category: "clinical",
    duration: "12 weeks full-time or 24 weeks part-time",
    durationWeeks: [12, 24],
    format: "hybrid",
    credential: "CMA & RMA Certification Prep",
    blurb:
      "Vital members of the medical team, skilled in both patient care and administrative tasks.",
    description: [
      "Become a vital member of the medical team with our comprehensive Medical Assistant Program. Medical Assistants are the backbone of clinical teams — skilled in both patient care and administrative tasks. From taking vital signs to managing medical records, they ensure healthcare runs smoothly and compassionately.",
    ],
    heroImage: "/images/programs/medical-assistant-hero.jpg",
    cardImage: "/images/programs/medical-assistant-card.jpg",
    // Verbatim from the live "Core Learning Objectives" list — a single flat
    // list on the source site, not separate modules. Do not split or expand
    // without new source content; see nghi-omega.vercel.app/programs/medical-assistant.
    curriculum: [
      {
        module: "Core Learning Objectives",
        outcomes: [
          "Medical terminology, anatomy, patient care",
          "Clinical & administrative skills",
          "Phlebotomy, orthopedic casting, diagnostic testing",
          "Vital signs, injections, EKGs, sterilization",
          "CMA (Certified Medical Assistant) certification prep",
          "RMA (Registered Medical Assistant) certification prep",
        ],
      },
    ],
    // Placeholder pending real hour figures from the client — not shown on
    // the medical-assistant program page, which has no hours breakdown.
    hours: { classroom: 220, lab: 140, externship: 160 },
    certification: { exam: "CMA & RMA Certification", body: "AMCA", onCampus: true },
    outlook: {
      employmentRate: "95%+",
      salaryRange: "$35,000 - $50,000",
      growth: "Above Average",
      environments: ["Physician Offices", "Hospitals", "Outpatient Clinics", "Urgent Care Centers", "Specialty Practices"],
    },
    // No tuition amount or "included" list is published on the live site —
    // only financial-aid availability (Pell Grants, federal loans, merit
    // scholarships). Do not invent a price or inclusions list here.
    faqs: [],
    relatedSlugs: ["nursing-assistant", "medical-billing-coding"],
  },
  {
    slug: "nursing-assistant",
    name: "Nursing Assistant",
    shortName: "CNA",
    category: "clinical",
    duration: "8–12 weeks",
    durationWeeks: [8, 12],
    format: "hybrid",
    credential: "Certified Nursing Assistant (CNA)",
    blurb: "The fastest path into direct patient care, with skills that transfer straight into a hospital or long-term care role.",
    description: [
      "Certified Nursing Assistants provide the hands-on daily care patients depend on — bathing, mobility support, feeding, and vital signs — under the supervision of nurses.",
      "This program combines classroom fundamentals with supervised clinical hours at a partner facility, preparing you for the Texas Nurse Aide state exam.",
    ],
    heroImage: "/images/programs/nursing-assistant-hero.jpg",
    cardImage: "/images/programs/nursing-assistant-card.jpg",
    curriculum: [
      {
        module: "Resident & Patient Care",
        outcomes: [
          "Assist patients with bathing, dressing, grooming, and mobility",
          "Safely transfer and reposition patients using proper body mechanics",
          "Recognize and report changes in a patient's condition",
        ],
      },
      {
        module: "Clinical Skills",
        outcomes: [
          "Take vital signs and record intake/output accurately",
          "Follow infection-control and standard-precaution protocols",
          "Support feeding and nutrition needs, including special diets",
        ],
      },
      {
        module: "State Exam Preparation",
        outcomes: [
          "Demonstrate all skills on the Texas Nurse Aide skills checklist",
          "Pass timed written and oral exam practice sessions",
          "Complete a mock skills evaluation with instructor feedback",
        ],
      },
    ],
    hours: { classroom: 60, lab: 40, externship: 40 },
    certification: { exam: "Texas Nurse Aide Registry Exam", body: "Texas Health & Human Services", onCampus: true },
    outlook: {
      employmentRate: "93%+",
      salaryRange: "$28,000–$34,000",
      growth: "8% (faster than average)",
      environments: ["Skilled nursing facilities", "Hospitals", "Assisted living", "Home health"],
      source: "U.S. Bureau of Labor Statistics, Nursing Assistants",
    },
    tuition: {
      note: "Our most affordable program — includes scrubs, skills kit, and the state exam fee.",
      includes: ["Tuition", "Skills practice kit", "State exam fee", "Clinical placement"],
    },
    faqs: [
      {
        q: "Is this the fastest program you offer?",
        a: "It's one of the fastest — most students finish in 8–12 weeks and can sit the state exam shortly after.",
      },
      {
        q: "Do I need a background check?",
        a: "Yes, a background check and health screening are required before your clinical rotation, consistent with facility requirements statewide.",
      },
      {
        q: "Can this lead to becoming a nurse later?",
        a: "Many graduates use CNA experience as a stepping stone toward LVN or RN programs — the clinical hours count as valuable direct-care experience.",
      },
    ],
    relatedSlugs: ["patient-care-technician", "medical-assistant", "phlebotomy-technician"],
  },
  {
    slug: "phlebotomy-technician",
    name: "Phlebotomy Technician",
    shortName: "Phlebotomy",
    category: "clinical",
    duration: "6–10 weeks",
    durationWeeks: [6, 10],
    format: "hybrid",
    credential: "Certified Phlebotomy Technician (CPT)",
    blurb: "Master venipuncture and specimen collection — one of the shortest paths to a clinical certification.",
    description: [
      "Phlebotomy technicians draw blood for testing, transfusions, research, and donations. It's precise, patient-facing work with steady demand across labs and hospitals.",
      "You'll build technique through supervised practice sticks before moving to a clinical externship at a partner lab or hospital.",
    ],
    heroImage: "/images/programs/phlebotomy-hero.jpg",
    cardImage: "/images/programs/phlebotomy-card.jpg",
    curriculum: [
      {
        module: "Venipuncture Technique",
        outcomes: [
          "Perform venipuncture using vacuum-tube and butterfly techniques",
          "Select correct order of draw and collection tubes for requested tests",
          "Manage patient anxiety and safely handle difficult draws",
        ],
      },
      {
        module: "Specimen Handling & Safety",
        outcomes: [
          "Label, process, and route specimens per lab protocol",
          "Perform capillary and dermal puncture for pediatric and geriatric patients",
          "Follow OSHA bloodborne pathogen standards and sharps disposal procedures",
        ],
      },
      {
        module: "Clinical Externship",
        outcomes: [
          "Complete a minimum number of successful supervised live draws",
          "Operate within a real lab or hospital collection workflow",
          "Communicate professionally with patients and lab staff",
        ],
      },
    ],
    hours: { classroom: 40, lab: 40, externship: 40 },
    certification: { exam: "Certified Phlebotomy Technician (CPT)", body: "AMCA", onCampus: true },
    outlook: {
      employmentRate: "92%+",
      salaryRange: "$31,000–$38,000",
      growth: "8% (faster than average)",
      environments: ["Hospital labs", "Diagnostic labs", "Blood donation centers", "Physician offices"],
      source: "U.S. Bureau of Labor Statistics, Phlebotomists",
    },
    tuition: {
      note: "Includes practice draw kits and one CPT exam attempt.",
      includes: ["Tuition", "Practice draw kit", "CPT exam fee", "Externship placement"],
    },
    faqs: [
      {
        q: "How many live draws will I do before graduating?",
        a: "You'll complete a set minimum of successful supervised draws during lab and externship — your advisor tracks this with you personally.",
      },
      {
        q: "Is this program available in the evenings?",
        a: "Yes, hybrid day and evening cohorts are offered depending on the current schedule — check upcoming start dates for specifics.",
      },
    ],
    relatedSlugs: ["ekg-technician", "medical-assistant", "patient-care-technician"],
  },
  {
    slug: "ekg-technician",
    name: "EKG Technician",
    shortName: "EKG Technician",
    category: "clinical",
    duration: "8–12 weeks",
    durationWeeks: [8, 12],
    format: "hybrid",
    credential: "Certified EKG Technician (CET)",
    blurb: "Learn to perform and read electrocardiograms in a fast, in-demand cardiac-care specialty.",
    description: [
      "EKG technicians capture the heart's electrical activity for physicians to diagnose cardiac conditions — a focused, in-demand specialty in hospitals and cardiology clinics.",
      "Training covers lead placement, rhythm recognition, and stress-test assistance, backed by hands-on lab practice before your externship.",
    ],
    heroImage: "/images/programs/ekg-technician-hero.jpg",
    cardImage: "/images/programs/ekg-technician-card.jpg",
    curriculum: [
      {
        module: "Cardiac Fundamentals",
        outcomes: [
          "Explain the heart's electrical conduction system and normal rhythm patterns",
          "Correctly place 12-lead EKG electrodes on adult patients",
          "Identify common arrhythmias and artifacts on an EKG strip",
        ],
      },
      {
        module: "Testing Procedures",
        outcomes: [
          "Prepare patients for and assist with cardiac stress tests",
          "Operate Holter and event monitor equipment",
          "Recognize when a reading requires immediate physician notification",
        ],
      },
      {
        module: "Clinical Practice",
        outcomes: [
          "Perform EKGs independently in a supervised clinical setting",
          "Maintain accurate testing documentation for the patient chart",
          "Communicate results appropriately within scope of practice",
        ],
      },
    ],
    hours: { classroom: 80, lab: 60, externship: 60 },
    certification: { exam: "Certified EKG Technician (CET)", body: "AMCA", onCampus: true },
    outlook: {
      employmentRate: "91%+",
      salaryRange: "$32,000–$40,000",
      growth: "5% (average)",
      environments: ["Hospital cardiology units", "Cardiology clinics", "Diagnostic imaging centers"],
      source: "U.S. Bureau of Labor Statistics, Cardiovascular Technologists and Technicians",
    },
    faqs: [
      {
        q: "Is EKG training combined with any other credential?",
        a: "Some students pair this with Patient Care Technician training for a broader clinical skill set — ask your advisor about combined scheduling.",
      },
      {
        q: "Will I learn to interpret EKGs like a cardiologist?",
        a: "You'll learn to recognize common patterns and flag abnormal readings for physician review — full diagnostic interpretation stays within the physician's scope.",
      },
    ],
    relatedSlugs: ["patient-care-technician", "medical-assistant", "phlebotomy-technician"],
  },
  {
    slug: "patient-care-technician",
    name: "Patient Care Technician",
    shortName: "PCT",
    category: "clinical",
    duration: "12–16 weeks",
    durationWeeks: [12, 16],
    format: "hybrid",
    credential: "Certified Patient Care Technician (CPCT/A)",
    blurb: "A broad clinical skill set combining nursing assistant, phlebotomy, and EKG basics in one credential.",
    description: [
      "Patient Care Technicians are cross-trained for direct patient care plus basic diagnostic support — a versatile role hospitals rely on across units.",
      "The program layers CNA-level care skills with phlebotomy and EKG basics, giving you a broader range of duties (and job options) than a single-skill certificate.",
    ],
    heroImage: "/images/programs/patient-care-technician-hero.jpg",
    cardImage: "/images/programs/patient-care-technician-card.jpg",
    curriculum: [
      {
        module: "Direct Patient Care",
        outcomes: [
          "Assist patients with daily living activities and mobility",
          "Take and record vital signs across patient age groups",
          "Recognize and escalate signs of patient distress",
        ],
      },
      {
        module: "Diagnostic Support Skills",
        outcomes: [
          "Perform basic venipuncture and specimen collection",
          "Apply and read a standard 12-lead EKG",
          "Assist with wound care and dressing changes under supervision",
        ],
      },
      {
        module: "Clinical Externship",
        outcomes: [
          "Rotate through hospital or long-term care units under supervision",
          "Document care accurately in patient records",
          "Coordinate with nursing staff as part of a care team",
        ],
      },
    ],
    hours: { classroom: 160, lab: 100, externship: 100 },
    certification: { exam: "Certified Patient Care Technician (CPCT/A)", body: "AMCA", onCampus: true },
    outlook: {
      employmentRate: "94%+",
      salaryRange: "$30,000–$37,000",
      growth: "9% (faster than average)",
      environments: ["Hospitals", "Skilled nursing facilities", "Rehabilitation centers"],
      source: "U.S. Bureau of Labor Statistics, Nursing Assistants and Orderlies",
    },
    faqs: [
      {
        q: "How is this different from the CNA program?",
        a: "PCT adds phlebotomy and EKG skills on top of nursing-assistant-level care, which opens up more roles and typically a higher starting wage.",
      },
      {
        q: "Can I start as a CNA and upgrade to PCT later?",
        a: "Yes — many students complete the CNA program first, then return for the PCT bridge coursework once they're working.",
      },
    ],
    relatedSlugs: ["nursing-assistant", "phlebotomy-technician", "ekg-technician"],
  },
  {
    slug: "mri-technician",
    name: "MRI Technician",
    shortName: "MRI Tech",
    category: "clinical",
    duration: "16–24 weeks",
    durationWeeks: [16, 24],
    format: "hybrid",
    credential: "MRI Technologist Certificate",
    blurb: "Our longest and most technical program — hands-on imaging training for a high-earning specialty.",
    description: [
      "MRI technicians operate advanced imaging equipment to help physicians diagnose everything from joint injuries to neurological conditions.",
      "Because this is an equipment-intensive specialty, the program runs longer than our other certificates and includes extended lab time on imaging simulators before a clinical externship.",
    ],
    heroImage: "/images/programs/mri-technician-hero.jpg",
    cardImage: "/images/programs/mri-technician-card.jpg",
    curriculum: [
      {
        module: "Imaging Fundamentals",
        outcomes: [
          "Explain magnetic resonance physics and safety zones",
          "Screen patients for MRI contraindications (implants, devices)",
          "Position patients correctly for common scan protocols",
        ],
      },
      {
        module: "Scanning Procedures",
        outcomes: [
          "Operate MRI console software to run standard protocols",
          "Recognize and correct common imaging artifacts",
          "Administer and monitor patients receiving contrast agents under supervision",
        ],
      },
      {
        module: "Clinical Externship",
        outcomes: [
          "Complete supervised scans across multiple body regions",
          "Maintain imaging documentation to facility standards",
          "Work within a radiology department team workflow",
        ],
      },
    ],
    hours: { classroom: 220, lab: 180, externship: 200 },
    certification: { exam: "MRI Technologist Certification", body: "ARMRIT", onCampus: true },
    outlook: {
      employmentRate: "90%+",
      salaryRange: "$48,000–$62,000",
      growth: "6% (faster than average)",
      environments: ["Hospital imaging departments", "Outpatient imaging centers", "Orthopedic practices"],
      source: "U.S. Bureau of Labor Statistics, Radiologic and MRI Technologists",
    },
    tuition: {
      note: "Our highest-tuition program given equipment and lab hours — ask your advisor for a full cost sheet and financing options.",
      includes: ["Tuition", "Simulator lab access", "Certification exam fee", "Externship placement"],
    },
    faqs: [
      {
        q: "Do I need a prior radiology background?",
        a: "No prior imaging experience is required, though comfort with technology and attention to detail help.",
      },
      {
        q: "Why is this program longer than the others?",
        a: "MRI is equipment-intensive — the extra weeks give you enough simulator and clinical time to scan confidently and safely before certification.",
      },
    ],
    relatedSlugs: ["patient-care-technician", "medical-assistant", "ekg-technician"],
  },
  {
    slug: "medical-administrative-assistant",
    name: "Medical Administrative Assistant",
    shortName: "MAAC",
    category: "administrative",
    duration: "8–16 weeks",
    durationWeeks: [8, 16],
    format: "hybrid",
    credential: "Certified Medical Administrative Assistant (CMAA)",
    blurb: "Run the front office of a clinic — scheduling, records, insurance, and patient communication.",
    description: [
      "Every clinic depends on the front office to keep patients moving and paperwork accurate. This program prepares you for scheduling, records, billing basics, and patient-facing communication.",
      "You'll train on real practice-management and EHR software before an administrative externship at a partner office.",
    ],
    heroImage: "/images/programs/medical-administrative-assistant-hero.jpg",
    cardImage: "/images/programs/medical-administrative-assistant-card.jpg",
    curriculum: [
      {
        module: "Front Office Operations",
        outcomes: [
          "Schedule and manage a multi-provider patient calendar",
          "Check patients in and out, including insurance verification",
          "Handle patient phone and in-person communication professionally",
        ],
      },
      {
        module: "Records & Compliance",
        outcomes: [
          "Maintain patient records within an EHR system",
          "Apply HIPAA privacy and release-of-information procedures",
          "Prepare and route referral and authorization paperwork",
        ],
      },
      {
        module: "Billing Basics",
        outcomes: [
          "Enter basic CPT/ICD-10 codes for common visit types",
          "Process patient payments and explain benefit statements",
          "Submit and track simple insurance claims",
        ],
      },
    ],
    hours: { classroom: 140, lab: 60, externship: 80 },
    certification: { exam: "Certified Medical Administrative Assistant (CMAA)", body: "AMCA", onCampus: true },
    outlook: {
      employmentRate: "93%+",
      salaryRange: "$31,000–$39,000",
      growth: "7% (faster than average)",
      environments: ["Physician offices", "Specialty clinics", "Outpatient centers", "Billing departments"],
      source: "U.S. Bureau of Labor Statistics, Medical Secretaries and Administrative Assistants",
    },
    faqs: [
      {
        q: "Is this a clinical or office-based program?",
        a: "Office-based — you won't perform hands-on clinical procedures, though you'll learn the medical terminology and workflow of a clinic.",
      },
      {
        q: "What software will I learn?",
        a: "You'll practice on a standard EHR/practice-management platform representative of what most Dallas–Fort Worth clinics use.",
      },
    ],
    relatedSlugs: ["medical-billing-coding", "medical-assistant", "mental-health-technician"],
  },
  {
    slug: "medical-billing-coding",
    name: "Medical Billing & Coding",
    shortName: "Billing & Coding",
    category: "administrative",
    duration: "12–20 weeks",
    durationWeeks: [12, 20],
    format: "flexible",
    credential: "Certified Billing & Coding Specialist (CBCS)",
    blurb: "Translate patient charts into billing codes — a remote-friendly role with flexible study options.",
    description: [
      "Medical coders and billers translate clinical documentation into the codes insurers and Medicare use to process claims — detail-oriented work that's often remote-friendly.",
      "This program is offered online, hybrid, or in-person so you can choose the pace and setting that fits your schedule.",
    ],
    heroImage: "/images/programs/medical-billing-coding-hero.jpg",
    cardImage: "/images/programs/medical-billing-coding-card.jpg",
    curriculum: [
      {
        module: "Coding Systems",
        outcomes: [
          "Assign accurate ICD-10-CM diagnosis codes from chart documentation",
          "Assign CPT and HCPCS procedure codes for common visit types",
          "Apply coding guidelines and modifiers correctly",
        ],
      },
      {
        module: "Billing & Claims",
        outcomes: [
          "Prepare and submit clean insurance claims",
          "Post payments and reconcile explanation-of-benefits statements",
          "Identify and appeal common claim denials",
        ],
      },
      {
        module: "Compliance",
        outcomes: [
          "Apply HIPAA and fraud/abuse compliance standards to billing work",
          "Audit a sample chart for coding accuracy",
        ],
      },
    ],
    hours: { classroom: 160, lab: 40, externship: 60 },
    certification: { exam: "Certified Billing & Coding Specialist (CBCS)", body: "AMCA", onCampus: true },
    outlook: {
      employmentRate: "92%+",
      salaryRange: "$36,000–$46,000",
      growth: "8% (faster than average)",
      environments: ["Hospital billing departments", "Physician offices", "Remote/work-from-home", "Insurance companies"],
      source: "U.S. Bureau of Labor Statistics, Medical Records Specialists",
    },
    faqs: [
      {
        q: "Can I complete this program fully online?",
        a: "Yes — the online track covers all coursework remotely; hybrid and in-person options are also available if you prefer classroom time.",
      },
      {
        q: "Can I work remotely after certification?",
        a: "Many billing and coding roles are remote-friendly, especially with 1–2 years of experience; your first role is often on-site while you build that track record.",
      },
    ],
    relatedSlugs: ["medical-administrative-assistant", "medical-assistant", "mental-health-technician"],
  },
  {
    slug: "mental-health-technician",
    name: "Mental Health Technician",
    shortName: "MHTC",
    category: "specialized",
    duration: "8–16 weeks",
    durationWeeks: [8, 16],
    format: "hybrid",
    credential: "Certified Behavioral Health Technician (CBHT)",
    blurb: "Support patients in behavioral health and substance-use treatment settings.",
    description: [
      "Mental Health Technicians support patients through crisis stabilization, therapeutic activities, and daily care in behavioral health and substance-use treatment settings.",
      "Training emphasizes de-escalation, documentation, and trauma-informed care alongside core patient-care skills.",
    ],
    heroImage: "/images/programs/mental-health-technician-hero.jpg",
    cardImage: "/images/programs/mental-health-technician-card.jpg",
    curriculum: [
      {
        module: "Behavioral Health Fundamentals",
        outcomes: [
          "Describe common psychiatric conditions and treatment approaches",
          "Apply trauma-informed care principles in patient interactions",
          "Recognize signs of crisis and apply de-escalation techniques",
        ],
      },
      {
        module: "Patient Support Skills",
        outcomes: [
          "Lead structured therapeutic and psychoeducational group activities",
          "Monitor and document patient behavior and safety checks",
          "Support activities of daily living for patients in treatment",
        ],
      },
      {
        module: "Clinical Externship",
        outcomes: [
          "Rotate on a behavioral health unit under clinical supervision",
          "Complete accurate shift documentation within scope of practice",
        ],
      },
    ],
    hours: { classroom: 140, lab: 60, externship: 80 },
    certification: { exam: "Certified Behavioral Health Technician (CBHT)", body: "AMCA", onCampus: true },
    outlook: {
      employmentRate: "90%+",
      salaryRange: "$30,000–$37,000",
      growth: "10% (faster than average)",
      environments: ["Psychiatric hospitals", "Substance-use treatment centers", "Residential treatment facilities"],
      source: "U.S. Bureau of Labor Statistics, Psychiatric Technicians",
    },
    faqs: [
      {
        q: "Is prior mental health experience required?",
        a: "No — the program is designed for career-changers with no prior behavioral health background.",
      },
      {
        q: "Is this program emotionally demanding?",
        a: "It can be — instructors spend real time on de-escalation, boundaries, and self-care so you're prepared for the realities of the work.",
      },
    ],
    relatedSlugs: ["patient-care-technician", "medical-administrative-assistant", "nursing-assistant"],
  },
  {
    slug: "orthopedic-casting",
    name: "Orthopedic Casting",
    shortName: "Orthopedic Casting",
    category: "specialized",
    duration: "2 weeks",
    durationWeeks: [2, 2],
    format: "in-person",
    credential: "Orthopedic Casting Certificate",
    blurb: "Our shortest program — intensive, hands-on training in cast and splint application.",
    description: [
      "This intensive two-week, in-person program teaches cast and splint application for fracture care — a focused technical skill used in orthopedic clinics, urgent care, and emergency departments.",
      "Because it's entirely hands-on, every session is in-person in our lab working with real casting materials under instructor supervision.",
    ],
    heroImage: "/images/programs/orthopedic-casting-hero.jpg",
    cardImage: "/images/programs/orthopedic-casting-card.jpg",
    curriculum: [
      {
        module: "Casting & Splinting",
        outcomes: [
          "Apply short-arm, long-arm, short-leg, and long-leg casts correctly",
          "Apply common splints for acute fracture stabilization",
          "Safely remove casts using a cast saw",
        ],
      },
      {
        module: "Patient Safety",
        outcomes: [
          "Recognize signs of compartment syndrome and circulatory compromise",
          "Educate patients on cast care and warning signs at home",
        ],
      },
    ],
    hours: { classroom: 20, lab: 40, externship: 0 },
    certification: { exam: "Orthopedic Casting Certificate Exam", body: "NAOT", onCampus: false },
    outlook: {
      employmentRate: "88%+",
      salaryRange: "$32,000–$40,000",
      growth: "5% (average)",
      environments: ["Orthopedic clinics", "Urgent care", "Emergency departments"],
      source: "U.S. Bureau of Labor Statistics, Orthopedic Technologists",
    },
    faqs: [
      {
        q: "Is there an externship for this program?",
        a: "No — because it's a focused two-week technical skill, all training happens in our lab rather than through an external clinical rotation.",
      },
      {
        q: "Do I need a healthcare background to enroll?",
        a: "It helps to have some clinical exposure (such as a CNA or MA background), though it isn't required — many students take this alongside another program.",
      },
    ],
    relatedSlugs: ["patient-care-technician", "ekg-technician", "medical-assistant"],
  },
  {
    slug: "physical-therapy-aide",
    name: "Physical Therapy Aide",
    shortName: "PT Aide",
    category: "clinical",
    duration: "8–12 weeks",
    durationWeeks: [8, 12],
    format: "hybrid",
    credential: "Physical Therapy Aide Certificate",
    blurb: "Support licensed therapists with patient setup, equipment, and rehab exercises.",
    description: [
      "Physical Therapy Aides support licensed physical therapists by preparing treatment areas, assisting patients with exercises, and maintaining equipment in outpatient rehab settings.",
      "The program covers anatomy fundamentals, common rehab equipment, and patient-assist techniques, with a clinical externship at a partner rehab clinic.",
    ],
    heroImage: "/images/programs/physical-therapy-aide-hero.jpg",
    cardImage: "/images/programs/physical-therapy-aide-card.jpg",
    curriculum: [
      {
        module: "Anatomy & Rehab Fundamentals",
        outcomes: [
          "Identify major muscle groups and joint movements relevant to rehab care",
          "Explain the purpose of common rehab modalities and equipment",
        ],
      },
      {
        module: "Patient Assistance",
        outcomes: [
          "Set up treatment areas and prepare equipment for therapy sessions",
          "Assist patients safely through prescribed exercises under supervision",
          "Support gait training with assistive devices (walkers, canes, parallel bars)",
        ],
      },
      {
        module: "Clinical Externship",
        outcomes: [
          "Rotate in an outpatient rehab clinic under a licensed therapist",
          "Maintain accurate treatment-session documentation",
        ],
      },
    ],
    hours: { classroom: 80, lab: 60, externship: 60 },
    certification: { exam: "Physical Therapy Aide Certificate Exam", body: "AMCA", onCampus: true },
    outlook: {
      employmentRate: "89%+",
      salaryRange: "$27,000–$33,000",
      growth: "8% (faster than average)",
      environments: ["Outpatient rehab clinics", "Sports medicine clinics", "Hospital rehab departments"],
      source: "U.S. Bureau of Labor Statistics, Physical Therapist Aides",
    },
    faqs: [
      {
        q: "Is this the same as a Physical Therapist Assistant (PTA)?",
        a: "No — a PTA requires an associate degree and state licensure. This certificate prepares you for the aide role, which is a common first step into rehab care.",
      },
      {
        q: "Can this program lead toward becoming a PTA later?",
        a: "Many graduates use aide experience to confirm the career fit before pursuing a PTA associate degree program.",
      },
    ],
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
