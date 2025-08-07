declare module 'minimatch' {
  interface MinimatchOptions {
    dot?: boolean;
    nobrace?: boolean;
    noglobstar?: boolean;
    noext?: boolean;
    nocomment?: boolean;
    nonegate?: boolean;
    flipNegate?: boolean;
    debug?: boolean;
    nobrace?: boolean;
    noglobstar?: boolean;
    noext?: boolean;
    nocomment?: boolean;
    nonegate?: boolean;
    flipNegate?: boolean;
    debug?: boolean;
  }

  function minimatch(path: string, pattern: string, options?: MinimatchOptions): boolean;
  
  class Minimatch {
    constructor(pattern: string, options?: MinimatchOptions);
    match(path: string): boolean;
  }
  
  export = minimatch;
  export { Minimatch };
  export default minimatch;
} 