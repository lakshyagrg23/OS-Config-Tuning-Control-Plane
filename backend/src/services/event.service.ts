import prisma from '../db/prisma';

export async function createEvent(data: any) {
  return prisma.event.create({
    data: {
      nodeId:           data.nodeId,
      param:            data.param,
      process:          data.process,
      decisionAction:   data.decisionAction,
      finalAction:      data.finalAction,
      cooldownApplied:  data.cooldownApplied,
      conflictDetected: data.conflictDetected,
      timestamp:        new Date(data.timestamp), // Converts Go's time string to a JS Date
    },
  });
}