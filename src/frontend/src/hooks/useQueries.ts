import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { AssessmentSubmission, SectionId } from '../backend';
import { AdminAssessmentRow } from '@/types/admin';

/**
 * Hook to submit a new assessment to the backend
 * Transforms frontend data into backend's AssessmentSubmission format
 */
export function useSubmitAssessment() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (submission: AssessmentSubmission) => {
      console.log('useSubmitAssessment: Starting mutation');
      
      if (!actor) {
        console.error('useSubmitAssessment: Actor not initialized');
        throw new Error('Actor not initialized');
      }
      
      console.log('useSubmitAssessment: Calling actor.submitAssessment with:', submission);
      
      try {
        const result = await actor.submitAssessment(submission);
        console.log('useSubmitAssessment: Backend returned ID:', result);
        return result;
      } catch (error) {
        console.error('useSubmitAssessment: Backend call failed:', error);
        throw error;
      }
    },
    onSuccess: (data) => {
      console.log('useSubmitAssessment: Mutation successful, invalidating queries');
      // Invalidate all assessment-related queries
      queryClient.invalidateQueries({ queryKey: ['allAssessments'] });
      queryClient.invalidateQueries({ queryKey: ['adminAssessments'] });
      queryClient.invalidateQueries({ queryKey: ['adminStats'] });
    },
    onError: (error) => {
      console.error('useSubmitAssessment: Mutation failed:', error);
    },
  });
}

/**
 * Hook to fetch all assessments for admin dashboard
 * Returns array of [Id, AssessmentSubmission] tuples from backend
 */
export function useGetAllAssessments() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery({
    queryKey: ['allAssessments'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getAllAssessments();
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
 * Hook to fetch all assessment data and transform to AdminAssessmentRow format
 */
export function useAdminAssessments() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<AdminAssessmentRow[]>({
    queryKey: ['adminAssessments'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');

      const assessments = await actor.getAllAssessments();

      // Transform backend [Id, AssessmentSubmission][] to AdminAssessmentRow[]
      return assessments.map(([id, submission]) => {
        const totalScore = 
          Number(submission.scores.sleep) +
          Number(submission.scores.hydration) +
          Number(submission.scores.diet) +
          Number(submission.scores.exercise);
        
        // Extract user name from submission
        const userName = submission.user?.name || `User ${Number(id)}`;
        
        // Convert timestamp from nanoseconds to milliseconds
        const assessmentDate = new Date(Number(submission.timestamp) / 1_000_000);

        return {
          id: Number(id),
          userName,
          assessmentDate,
          totalScore,
          sectionScores: {
            sleep: Number(submission.scores.sleep),
            hydration: Number(submission.scores.hydration),
            diet: Number(submission.scores.diet),
            exercise: Number(submission.scores.exercise),
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
