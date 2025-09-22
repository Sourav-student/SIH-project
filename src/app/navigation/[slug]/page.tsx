import DynamicRouteClient from "./DynamicRouteClient";

export default function PlaceRoute({ searchParams }: {
  searchParams: { [key: string]: string | undefined }
}) {

  return (
    <div className="min-h-screen">
       <DynamicRouteClient query={searchParams.q} />;
    </div>
  );
}
