import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { AssessmentSubmission } from '../backend';
import { AdminAssessmentRow } from '@/types/admin';

export function useGetAssessmentSubmissionById(id: bigint | null) {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['assessmentSubmission', id?.toString()],
    queryFn: async () => {
      if (!actor || !id) return null;
      return actor.getAssessmentSubmissionById(id);
    },
    enabled: !!actor && !isFetching && id !== null,
  });
}

export function useSaveAssessmentSubmission() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (submission: AssessmentSubmission) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.saveAssessmentSubmission(submission);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assessmentSubmission'] });
      queryClient.invalidateQueries({ queryKey: ['adminAssessments'] });
      queryClient.invalidateQueries({ queryKey: ['adminStats'] });
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
 * Hook to fetch all assessment summaries for admin dashboard
 * Transforms backend AssessmentSummary[] data into AdminAssessmentRow[] format
 */
export function useAdminAssessments() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<AdminAssessmentRow[]>({
    queryKey: ['adminAssessments'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');

      const summaries = await actor.getAllAssessmentSummaries();

      // Transform backend AssessmentSummary[] to AdminAssessmentRow[]
      return summaries.map((summary) => {
        const totalScore = Number(summary.totalScore);
        
        // Extract user name from summary
        const userName = summary.user?.name || `User ${Number(summary.id)}`;
        
        // Convert timestamp from nanoseconds to milliseconds
        const assessmentDate = new Date(Number(summary.timestamp) / 1_000_000);

        return {
          id: Number(summary.id),
          userName,
          assessmentDate,
          totalScore,
          sectionScores: {
            sleep: Number(summary.scores.sleep),
            hydration: Number(summary.scores.hydration),
            diet: Number(summary.scores.diet),
            exercise: Number(summary.scores.exercise),
          },
          whatsappNumber: 'N/A', // Not stored in backend yet
          email: null, // Not stored in backend yet
        };
      });
    },
    enabled: !!actor && !actorFetching,
    staleTime: 30000, // 30 seconds
    gcTime: 300000, // 5 minutes
    refetchOnWindowFocus: true,
    retry: 2,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
  };
}

/**
 * Hook to fetch admin dashboard statistics from backend
 * Returns pre-calculated stats including total assessments, average score, alert users, and recent submissions
 */
export function useAdminStats() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery({
    queryKey: ['adminStats'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      
      const stats = await actor.getAdminDashboardStats();
      
      return {
        totalAssessments: Number(stats.totalAssessments),
        averageScore: stats.averageScore,
        alertUsersCount: Number(stats.alertUsersCount),
        recentSubmissionsCount: Number(stats.recentSubmissionsCount),
      };
    },
    enabled: !!actor && !actorFetching,
    staleTime: 30000, // 30 seconds
    gcTime: 300000, // 5 minutes
    refetchOnWindowFocus: true,
    retry: 2,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
  };
}
