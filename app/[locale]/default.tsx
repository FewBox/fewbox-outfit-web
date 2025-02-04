export default async function Default({
    params,
}: {
    params: Promise<{ locale: string }>
}) {
    const params_result = await params;
    console.log('FewBox Params:', params_result);
}