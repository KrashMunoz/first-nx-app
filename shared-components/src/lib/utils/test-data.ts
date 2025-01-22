export interface DomainType {
    type: string;
    attributes: Attribute[];
}

export interface Attribute {
    key: string;
    primary: boolean;
    input: string;
}

export const domainTypes: DomainType[] = [
    {
        "type": "Post",
        "attributes": [
            {
                "key": "PostID",
                "primary": true,
                "input": "integer"
            },
            {
                "key": "PostTitle",
                "primary": false,
                "input": "string"
            },
            {
                "key": "Description",
                "primary": false,
                "input": "string"
            },
            {
                "key": "PostAuthor",
                "primary": false,
                "input": "integer"
            }
        ]
    },
    {
        "type": "User",
        "attributes": [
            {
                "key": "UserID",
                "primary": true,
                "input": "integer"
            },
            {
                "key": "UserName",
                "primary": false,
                "input": "string"
            },
            {
                "key": "Age",
                "primary": false,
                "input": "integer"
            }
        ]
    }
]

