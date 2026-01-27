import { useContext } from "react";
import { EducationContext } from "../context/EducationContext";

export const useEducation = () => useContext(EducationContext);
