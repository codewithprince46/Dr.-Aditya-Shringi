import { Doctor, MedicalService, Testimonial, ClinicHours } from '../types';

export const CLINIC_INFO = {
  name: "MediCare Clinic",
  tagline: "Your Health, Our Priority",
  slogan: "World-class medical care with compassionate, personalized attention.",
  address: "450 Health Avenue, Suite 300, Medical District, Boston, MA 02115",
  phone: "+1 (800) 456-7890",
  emergencyPhone: "+1 (800) 911-CARE",
  whatsappNumber: "919772674133", // India country code +91 with 9772674133
  displayWhatsApp: "+91 9772674133",
  email: "care@medicareclinic.com",
  adminEmail: "admin@medicareclinic.com",
  mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2948.844390771803!2d-71.10626352346764!3d42.339433636006454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e3798e3b5df5fb%3A0xe2be88e990c7bfbc!2sLongwood%20Medical%20Area%2C%20Boston%2C%20MA!5e0!3m2!1sen!2sus!4v1715000000000!5m2!1sen!2sus",
  disclaimer: "Notice: MediCare Clinic is a demonstration web application for a premier healthcare center. All medical profiles, credentials, doctor names, and patient testimonials are fictional sample data for demonstration purposes."
};

export const CLINIC_HOURS: ClinicHours[] = [
  { day: "Monday - Friday", hours: "08:00 AM - 08:00 PM" },
  { day: "Saturday", hours: "09:00 AM - 05:00 PM" },
  { day: "Sunday", hours: "10:00 AM - 02:00 PM (Emergency Only)" },
];

export const DOCTORS: Doctor[] = [
  {
    id: "dr-sarah-jenkins",
    name: "Dr. Sarah Jenkins, MD",
    role: "Chief Cardiologist & Medical Director",
    department: "Cardiology",
    qualifications: "MD (Harvard Medical School), FACC, Board Certified in Cardiovascular Diseases",
    experience: "16+ Years Experience",
    bio: "Dr. Jenkins is an internationally acclaimed cardiologist specializing in preventive cardiology, coronary interventions, and comprehensive cardiovascular diagnostics.",
    specializations: ["Cardiovascular Assessment", "Echocardiography", "Preventive Heart Health", "Hypertension Management"],
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800",
    rating: 4.9,
    reviewsCount: 142,
    availableDays: "Mon, Wed, Fri"
  },
  {
    id: "dr-david-rodriguez",
    name: "Dr. David Rodriguez, MD",
    role: "Senior General Physician",
    department: "General Consultation",
    qualifications: "MD (Johns Hopkins University), Internal Medicine Residency",
    experience: "14+ Years Experience",
    bio: "Dr. Rodriguez provides comprehensive primary healthcare, executive physical examinations, chronic disease management, and proactive wellness coaching.",
    specializations: ["Primary Care", "Chronic Disease Management", "Executive Health Checkups", "Geriatric Care"],
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800",
    rating: 4.8,
    reviewsCount: 198,
    availableDays: "Mon - Sat"
  },
  {
    id: "dr-emily-watson",
    name: "Dr. Emily Watson, MD",
    role: "Consultant Dermatologist",
    department: "Dermatology",
    qualifications: "MD, FAAD (Stanford University School of Medicine)",
    experience: "11+ Years Experience",
    bio: "Dr. Watson is recognized for clinical excellence in clinical dermatology, skin cancer screenings, laser treatments, and advanced aesthetic rejuvenation therapies.",
    specializations: ["Clinical Dermatology", "Acne & Rosacea", "Skin Cancer Screening", "Aesthetic Rejuvenation"],
    image: "https://images.unsplash.com/photo-1594824813639-4507c92b21c5?auto=format&fit=crop&q=80&w=800",
    rating: 4.9,
    reviewsCount: 165,
    availableDays: "Tue, Thu, Sat"
  },
  {
    id: "dr-james-anderson",
    name: "Dr. James Anderson, MD",
    role: "Pediatric Specialist",
    department: "Pediatrics",
    qualifications: "MD, FAAP (Yale School of Medicine)",
    experience: "13+ Years Experience",
    bio: "Devoted to gentle and friendly pediatric care, Dr. Anderson works closely with parents for newborn care, childhood immunizations, and developmental tracking.",
    specializations: ["Newborn Care", "Pediatric Wellness Exams", "Childhood Immunizations", "Developmental Assessments"],
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=800",
    rating: 5.0,
    reviewsCount: 210,
    availableDays: "Mon, Tue, Wed, Fri"
  },
  {
    id: "dr-marcus-vance",
    name: "Dr. Marcus Vance, MD",
    role: "Consultant Orthopedic Surgeon",
    department: "Orthopedics",
    qualifications: "MD (Columbia University), Fellowship in Sports Medicine",
    experience: "15+ Years Experience",
    bio: "Specializing in joint preservation, sports injury recovery, minimally invasive spine procedures, and progressive rehabilitation regimens.",
    specializations: ["Sports Injuries", "Joint Preservation", "Arthritis Care", "Fracture Management"],
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800",
    rating: 4.8,
    reviewsCount: 134,
    availableDays: "Mon, Wed, Thu"
  },
  {
    id: "dr-alyssa-chen",
    name: "Dr. Alyssa Chen, DDS",
    role: "Lead Cosmetic & Restorative Dentist",
    department: "Dental Care",
    qualifications: "DDS (University of Pennsylvania School of Dental Medicine)",
    experience: "10+ Years Experience",
    bio: "Expert in pain-free dentistry, smile designs, porcelain veneers, precision root canal therapy, and comprehensive oral health maintenance.",
    specializations: ["Painless Dentistry", "Cosmetic Smile Makeover", "Teeth Whitening", "Crowns & Dental Implants"],
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800",
    rating: 4.9,
    reviewsCount: 178,
    availableDays: "Tue, Wed, Fri, Sat"
  }
];

export const SERVICES: MedicalService[] = [
  {
    id: "general-consultation",
    title: "General Consultation",
    department: "General Consultation",
    shortDescription: "Comprehensive health screenings, vital sign checkups, and holistic medical treatment plans.",
    fullDescription: "Our primary care physicians provide comprehensive medical evaluations, management of acute and chronic health conditions, preventative medicine protocols, and executive physical screenings.",
    iconName: "Stethoscope",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800",
    commonTreatments: ["Executive Health Screenings", "Hypertension & Diabetes Care", "Diagnostic Blood Panels", "Infection Diagnostics"],
    keyBenefits: ["Same-day appointments available", "Detailed digital health reports", "Continuous longitudinal care"],
    duration: "30 - 45 Minutes",
    doctorInCharge: "Dr. David Rodriguez, MD"
  },
  {
    id: "cardiology",
    title: "Cardiology",
    department: "Cardiology",
    shortDescription: "Advanced cardiovascular diagnostics, ECG, color Doppler echocardiography, and preventive heart care.",
    fullDescription: "Dedicated cardiovascular unit utilizing advanced non-invasive diagnostic equipment to evaluate heart rhythm disorders, coronary artery conditions, valve abnormalities, and vascular health.",
    iconName: "HeartPulse",
    image: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&q=80&w=800",
    commonTreatments: ["Color Doppler Echocardiogram", "Holter 24-hr Monitoring", "Treadmill Stress Test (TMT)", "Lipid Profile Management"],
    keyBenefits: ["Board-certified heart specialists", "Immediate ECG readings", "Personalized lifestyle programs"],
    duration: "45 - 60 Minutes",
    doctorInCharge: "Dr. Sarah Jenkins, MD"
  },
  {
    id: "dermatology",
    title: "Dermatology",
    department: "Dermatology",
    shortDescription: "Clinical skincare, dermatological allergy treatments, mole mapping, and modern cosmetic therapies.",
    fullDescription: "Specialized care for conditions affecting the skin, hair, and nails. Our dermatologists offer advanced diagnostic biopsy, dermoscopy, laser dermatology, and medical aesthetic treatments.",
    iconName: "Sparkles",
    image: "https://images.unsplash.com/photo-1512290900672-1f486b8d27a7?auto=format&fit=crop&q=80&w=800",
    commonTreatments: ["Severe Acne Protocols", "Psoriasis & Eczema Therapy", "Dermoscopy Mole Mapping", "Chemical Peels & Scar Care"],
    keyBenefits: ["Evidence-based dermatological care", "Minimally invasive therapies", "Medical-grade skincare plans"],
    duration: "30 - 45 Minutes",
    doctorInCharge: "Dr. Emily Watson, MD"
  },
  {
    id: "pediatrics",
    title: "Pediatrics",
    department: "Pediatrics",
    shortDescription: "Compassionate healthcare for newborns, infants, children, and adolescents in a welcoming child-friendly environment.",
    fullDescription: "Gentle and supportive pediatric services focusing on healthy physical, psychological, and emotional development from birth through adolescence, including scheduled vaccinations.",
    iconName: "Baby",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800",
    commonTreatments: ["Well-Child Developmental Checkups", "CDC-Recommended Immunizations", "Pediatric Allergy & Asthma", "Childhood Nutrition Planning"],
    keyBenefits: ["Warm, child-friendly atmosphere", "Gentle vaccination protocols", "Direct parent messaging"],
    duration: "30 - 40 Minutes",
    doctorInCharge: "Dr. James Anderson, MD"
  },
  {
    id: "orthopedics",
    title: "Orthopedics",
    department: "Orthopedics",
    shortDescription: "Joint, bone, and muscular wellness therapies, arthritis management, and sports rehabilitation.",
    fullDescription: "Comprehensive musculoskeletal care for athletic injuries, degenerative joint conditions, spinal stiffness, fractures, and postoperative orthopedic rehabilitation.",
    iconName: "Activity",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
    commonTreatments: ["Joint Injections & Arthroscopy", "Sports Rehabilitation Guidance", "Spine & Posture Correction", "Osteoporosis Assessments"],
    keyBenefits: ["Modern on-site digital X-Ray", "Integrated physiotherapy support", "Conservative treatment focus"],
    duration: "40 - 50 Minutes",
    doctorInCharge: "Dr. Marcus Vance, MD"
  },
  {
    id: "dental-care",
    title: "Dental Care",
    department: "Dental Care",
    shortDescription: "Modern dental hygiene, pain-free restorations, cosmetic smile design, and preventive oral health.",
    fullDescription: "Complete family and aesthetic dental services equipped with digital intraoral cameras, painless ultrasonic scaling, composite tooth restorations, and porcelain smile enhancements.",
    iconName: "Smile",
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800",
    commonTreatments: ["Ultrasonic Teeth Cleaning", "Aesthetic Teeth Whitening", "Composite Fillings & Crowns", "Painless Root Canal Therapy"],
    keyBenefits: ["Digitally assisted precision", "Virtually painless techniques", "Sterilization to hospital standard"],
    duration: "45 - 60 Minutes",
    doctorInCharge: "Dr. Alyssa Chen, DDS"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    name: "Eleanor Vance",
    role: "Executive Director",
    comment: "MediCare Clinic redefines what medical visits should feel like. Dr. Jenkins took the time to explain my cardiac results with utter clarity. The appointment booking was seamless, and the clinic environment is spotless.",
    rating: 5,
    date: "2 weeks ago",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "test-2",
    name: "Jonathan Hughes",
    role: "Architect",
    comment: "From the immediate WhatsApp reminder to the zero waiting room delay, MediCare sets the gold standard. Dr. Rodriguez diagnosed a persistent condition two other clinics missed.",
    rating: 5,
    date: "1 month ago",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "test-3",
    name: "Maya Patel",
    role: "Mother of Two",
    comment: "Taking my 3-year old for vaccinations used to be stressful, but Dr. Anderson's pediatric clinic made my son feel calm and cheerful. I wouldn't trust our family healthcare to anyone else.",
    rating: 5,
    date: "3 weeks ago",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"
  }
];

export const CLINIC_STATS = [
  { label: "Satisfied Patients", value: "24,000+", icon: "Users" },
  { label: "Board-Certified Specialists", value: "18+", icon: "Award" },
  { label: "Clinical Departments", value: "6 Major", icon: "Building2" },
  { label: "Patient Satisfaction Rate", value: "99.4%", icon: "HeartHandshake" },
];

export const WHY_CHOOSE_US = [
  {
    title: "International Clinical Standards",
    description: "Equipped with state-of-the-art diagnostic instruments and strict sterilization protocols matching global hospital benchmarks.",
    icon: "ShieldCheck"
  },
  {
    title: "Distinguished Medical Faculty",
    description: "Our physicians hail from premier institutions with fellowships in cardiovascular, pediatric, and cosmetic medical branches.",
    icon: "GraduationCap"
  },
  {
    title: "Zero Waiting Time Policy",
    description: "We value your schedule. Our streamlined digital scheduling guarantees you enter your consultation promptly.",
    icon: "Clock"
  },
  {
    title: "Seamless Digital Follow-up",
    description: "Instant appointment booking, direct WhatsApp support, automated prescription alerts, and electronic health tracking.",
    icon: "Smartphone"
  }
];
