/**
 * TypeScript interface for the Dictionary structure used throughout the app
 * This replaces 'any' types with proper type definitions
 */

export interface ManifestoCard {
  title: string;
  text: string;
}

export interface MissionCard {
  title: string;
  description: string;
}

export interface DogecoinDictionary {
  "dogecoin.org": {
    home: {
      about: {
        hero: {
          title: string;
          intro: string;
          bulletPoints: string[];
          subtitleBefore: string;
          subtitleHighlight: string;
          subtitleAfter: string;
        };
        manifesto: {
          title: string;
          intro: string;
          cards: ManifestoCard[];
          signatoriesTitle: string;
          sign: {
            title: string;
            text: string;
            button: string;
          };
        };
        history: {
          title: string;
          description: string;
          description2: string;
        };
      };
      meta: {
        title: string;
        description: string;
      };
      hero: {
        title: string;
        subtitle: string;
        tagline: string;
      };
      sections: {
        activity: {
          title: string;
        };
        mission: {
          title: string;
          description: string;
          cards: MissionCard[];
        };
        donation: {
          title: string;
          description: string;
          whyDonate: {
            title: string;
            reasons: {
              development: {
                title: string;
                text: string;
              };
              community: {
                title: string;
                text: string;
              };
              education: {
                title: string;
                text: string;
              };
            };
          };
          steps: {
            select: string;
            scan: string;
            walletAddress: string;
          };
          buttons: {
            "69": {
              quote: string;
            };
            "1337": {
              quote: string;
            };
            "9999": {
              quote: string;
            };
            custom: {
              validationError: string;
            };
          };
          copy: {
            button: string;
            success: string;
            checkItOut: string;
            title: string;
            copied: string;
          };
        };
        members: {
          title: string;
          description: string;
          profiles: {
            donna: { description: string };
            dereck: { description: string };
            david: { description: string };
            debbie: { description: string };
            dick: { description: string };
            erick: { description: string };
          };
        };
        partners: {
          title: string;
          description: string;
          houseOfDoge: {
            name: string;
            description: string;
            buttonText: string;
          };
        };
      };
      projects: {
        title: string;
        viewProject: string;
        viewAllProjects: string;
      };
      activities: {
        viewActivity: string;
        viewAllActivities: string;
      };
      navigation: {
        home: string;
        about: string;
        projects: string;
        activities: string;
        blog: string;
      };
      blog?: {
        by?: string;
      };
      footer: {
        description: string;
        sections: {
          main: {
            title: string;
            links: {
              home: string;
              about: string;
              news: string;
            };
          };
          social: {
            title: string;
            links: {
              x: string;
              github: string;
              discord: string;
            };
          };
          legal: {
            title: string;
            links: {
              trademarks: string;
              privacy: string;
            };
          };
        };
        copyright: string;
        backToTop: string;
      };
    };
  };
}

// Type alias for easier usage
export type Dictionary = DogecoinDictionary;