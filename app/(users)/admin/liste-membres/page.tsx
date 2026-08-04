import { AdminPageHeader } from "@/components/kp/AdminPageHeader";

import { adminCardClass, adminCardGlow } from "@/components/kp/adminStyles";

import { prisma, UserStatus } from "@/lib/db";

import { ApprovedMembersTable } from "@/app/(users)/admin/liste-membres/ApprovedMembersTable";



export default async function ListeMembresPage() {

  const approvedMembers = await prisma.user.findMany({

    where: { status: UserStatus.APPROVED },

    orderBy: { approvedAt: "desc" },

  });



  const rows = approvedMembers.map((member) => ({

    id: member.id,

    clerkUserId: member.clerkUserId,

    email: member.email,

    fullName: member.fullName ?? "",

    phone: member.phone ?? "",

    residenceCountry: member.residenceCountry ?? "",

    role: member.role,

    status: member.status,

    invitationId: member.invitationId ?? "",

    approvedAt: member.approvedAt?.toISOString() ?? "",

    approvedBy: member.approvedBy ?? "",

    createdAt: member.createdAt.toISOString(),

    updatedAt: member.updatedAt.toISOString(),

  }));



  return (

    <div className="space-y-8">

      <AdminPageHeader

        title="Liste des membres"

        description="Consultez tous les membres approuvés de l’espace privé KPANDJI."

      />



      <section className={adminCardClass}>

        <div className={adminCardGlow} aria-hidden />

        <h2 className="font-serif text-2xl text-white">Membres approuvés</h2>

        <p className="mt-2 font-sans text-sm text-white/50">

          {approvedMembers.length} membre

          {approvedMembers.length !== 1 ? "s" : ""} approuvé

          {approvedMembers.length !== 1 ? "s" : ""}.

        </p>



        {approvedMembers.length === 0 ? (

          <p className="mt-6 font-sans text-sm text-white/50">

            Aucun membre approuvé pour le moment.

          </p>

        ) : (

          <ApprovedMembersTable members={rows} />

        )}

      </section>

    </div>

  );

}


