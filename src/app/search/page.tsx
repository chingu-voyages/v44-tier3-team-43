const Page = ({
	searchParams
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}) => {
	return <h1>Search query: {JSON.stringify(searchParams)}</h1>;
};

export default Page;
