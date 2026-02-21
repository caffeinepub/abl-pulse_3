import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { Principal } from '@icp-sdk/core/principal';
import type { CompleteWellnessReport, UserAnswers, MedicalHistory } from '../backend';

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
