export type PropsWithChildren<Props = { key?: string }> = {
  children: React.ReactNode;
} & Props;
