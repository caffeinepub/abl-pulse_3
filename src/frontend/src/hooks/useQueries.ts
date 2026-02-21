import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { Principal } from '@icp-sdk/core/principal';
import type { CompleteWellnessReport, UserAnswers, MedicalHistory } from '../backend';
import { AdminAssessmentRow } from '@/types/admin';

export function useGetAllWellnessReports() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['wellnessReports'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllWellnessReports();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetWellnessReportById(id: bigint | null) {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['wellnessReport', id?.toString()],
    queryFn: async () => {
      if (!actor || !id) return null;
      return actor.getWellnessReportById(id);
    },
    enabled: !!actor && !isFetching && id !== null,
  });
}

export function useSaveWellnessReport() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (report: CompleteWellnessReport) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.saveWellnessReport(report);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wellnessReports'] });
      queryClient.invalidateQueries({ queryKey: ['adminAssessments'] });
    },
  });
}

export function useGetTestData() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['testData'],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getTestData();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsAdminUser(email: string | null) {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['isAdminUser', email],
    queryFn: async () => {
      if (!actor || !email) return false;
      try {
        return await actor.isAdminUser(email);
      } catch (error) {
        console.error('Error checking admin status:', error);
        return false;
      }
    },
    enabled: !!actor && !isFetching && email !== null && email.trim() !== '',
    retry: 1,
  });
}

/**
 * Hook to fetch all wellness reports for admin dashboard
 * Transforms backend data into frontend-friendly format
 */
export function useAdminAssessments() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<AdminAssessmentRow[]>({
    queryKey: ['adminAssessments'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');

      const reports = await actor.getAllWellnessReports();

      // Transform backend data to frontend format
      return reports.map(([id, report]) => {
        // Calculate section scores from answers
        const calculateScore = (answers: bigint[]): number => {
          return answers.reduce((sum, val) => sum + Number(val), 0);
        };

        const sleepScore = calculateScore(report.healthProfile.answers.sleep);
        const hydrationScore = calculateScore(report.healthProfile.answers.hydration);
        const dietScore = calculateScore(report.healthProfile.answers.diet);
        const exerciseScore = calculateScore(report.healthProfile.answers.exercise);

        const totalScore = sleepScore + hydrationScore + dietScore + exerciseScore;

        // Extract user info from recommendations or use placeholder
        // Note: Backend doesn't store user name/contact in report, so we'll need to enhance this
        // For now, we'll use placeholder data
        const userName = `User ${Number(id)}`;
        const whatsappNumber = 'N/A';
        const email = null;

        return {
          id: Number(id),
          userName,
          assessmentDate: new Date(Number(report.timestamp) / 1000000), // Convert nanoseconds to milliseconds
          totalScore,
          sectionScores: {
            sleep: sleepScore,
            hydration: hydrationScore,
            diet: dietScore,
            exercise: exerciseScore,
          },
          whatsappNumber,
          email,
        };
      });
    },
    enabled: !!actor && !actorFetching,
    staleTime: 30000, // 30 seconds
    gcTime: 300000, // 5 minutes (formerly cacheTime)
    refetchOnWindowFocus: true,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
  };
}
