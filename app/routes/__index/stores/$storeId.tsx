import invariant from "tiny-invariant";
import type { ActionArgs, LoaderArgs} from "@remix-run/node";
import { unstable_parseMultipartFormData } from "@remix-run/node";
import { json } from "@remix-run/node";
import { prisma } from "~/db.server";
import { useCatch, useLoaderData, useParams } from "@remix-run/react";
import { s3UploaderHandler } from "~/models/uploader-handler.server";
import { StyledLogoBox } from "./__stores/styles/new.styled";
import { ImageUploader, TextLabel } from "~/components";
import { requireUser } from "~/services/session.server";

export const loader = async ({ params }: LoaderArgs) => {
  invariant(params.storeId, "Missing store id");

  const store = await prisma.store.findFirst({
    where: {
      id: params.storeId,
    },
  });

  if (!store) {
    throw new Response("Oops, Store not found", { status: 404 });
  }

  return json({ store });
};

// export async function action({ request }: ActionArgs) {
//   const user = await requireUser(request);

//   const formData = await unstable_parseMultipartFormData(
//     request,
//     s3UploaderHandler
//   );

//   const storeIcon = formData.get("storeIcon");

//   // create store
//   const updateStore = await updateStoreIcon({
//     icon: storeIcon,
//   });
  
//   return null;
// }

export default function StoreDetailsRoute() {
  const data = useLoaderData<typeof loader>();
  function setSelectedFile(file: File): any {
    throw new Error("Function not implemented.");
  }

  return (
    <div>
      <StyledLogoBox>
        <TextLabel htmlFor="storeIcon">Icon:</TextLabel>
        <ImageUploader
          // imageUrl={formData.icon || ""}
          imageUrl={""}
          name="storeIcon"
          id="storeIcon"
          handleFileChange={(file) => setSelectedFile(file)}
        />
      </StyledLogoBox>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  const params = useParams();

  if (caught.status === 404) {
    return (
      <div>
        Store "{params.storeId}" not found
      </div>
    );
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
