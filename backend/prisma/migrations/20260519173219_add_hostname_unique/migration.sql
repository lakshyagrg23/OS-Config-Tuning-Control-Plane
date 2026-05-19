-- CreateTable
CREATE TABLE "nodes" (
    "id" TEXT NOT NULL,
    "hostname" TEXT NOT NULL,
    "ip_address" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "last_seen" TIMESTAMP(3) NOT NULL,
    "agent_version" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "nodes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL,
    "node_id" TEXT NOT NULL,
    "param" TEXT NOT NULL,
    "process" TEXT NOT NULL,
    "decision_action" TEXT NOT NULL,
    "final_action" TEXT NOT NULL,
    "cooldown_applied" BOOLEAN NOT NULL,
    "conflict_detected" BOOLEAN NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "policies" (
    "id" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "policy_json" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "policies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "nodes_hostname_key" ON "nodes"("hostname");

-- CreateIndex
CREATE UNIQUE INDEX "policies_version_key" ON "policies"("version");

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_node_id_fkey" FOREIGN KEY ("node_id") REFERENCES "nodes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
