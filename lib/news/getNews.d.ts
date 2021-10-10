export interface News {
    link: string;
    header: string;
    time: string;
    origin: string;
}
export declare type Err = undefined | unknown;
export declare function getNews(term: string | string[], lang?: string): Promise<any>;
//# sourceMappingURL=getNews.d.ts.map