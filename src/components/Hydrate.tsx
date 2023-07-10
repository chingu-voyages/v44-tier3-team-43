"use client";

import { Hydrate as RQHydrate, HydrateProps } from "@tanstack/react-query";

const Hydrate = (props: HydrateProps) => <RQHydrate {...props} />;

export default Hydrate;
