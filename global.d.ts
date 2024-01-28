export declare global {
  type Recursive<T> = {[P in keyof T]: Recursive<T[P]>};

  // styled-components
  type TDollarPrefix<T> = {
    [K in keyof T as `$${string & K}`]: T[K];
  };

  // next js
  type NextPageProps<T> = {
    params: T;
    searchParams: {
      [key: string]: string | string[];
    };
  };
}
