import { useMutation } from "@tanstack/react-query";

import {
  askCareerCoach,
} from "../api/careerCoach.api";

export const useCareerCoach = () => {
  return useMutation({
    mutationFn: askCareerCoach,
  });
};