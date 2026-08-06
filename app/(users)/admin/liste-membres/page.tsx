import { AdminPageHeader } from "@/components/kp/AdminPageHeader";

import { AdminCountLine } from "@/components/kp/AdminCountLine";

import { adminCardClass, adminCardGlow } from "@/components/kp/adminStyles";

import { Tr } from "@/components/kp/Tr";

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

        title={<Tr fr="Liste des membres" en="Members list" />}

        description={
          <Tr
            fr="Consultez tous les membres approuvés de l’espace privé KPANDJI."
            en="View all approved members of the KPANDJI private area."
          />
        }

      />



      <section className={adminCardClass}>

        <div className={adminCardGlow} aria-hidden />

        <h2 className="font-serif text-2xl text-white">
          <Tr fr="Membres approuvés" en="Approved members" />
        </h2>

        <AdminCountLine
          count={approvedMembers.length}
          singular={{ fr: "{n} membre approuvé.", en: "{n} approved member." }}
          plural={{ fr: "{n} membres approuvés.", en: "{n} approved members." }}
        />



        {approvedMembers.length === 0 ? (

          <p className="mt-6 font-sans text-sm text-white/50">

            <Tr
              fr="Aucun membre approuvé pour le moment."
              en="No approved members at the moment."
            />

          </p>

        ) : (

          <ApprovedMembersTable members={rows} />

        )}

      </section>

    </div>

  );

}


