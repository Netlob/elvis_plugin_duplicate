/**
 * Elvis REST API
 * Elvis RESTful API
 *
 * OpenAPI spec version: 1.2.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

import { ElvisRequest } from './elvis-request';
import request = require('request');
import Promise = require('bluebird');

let defaultBasePath = 'http://localhost:8080';

// ===============================================
// This file is autogenerated - Please do not edit
// ===============================================

/* tslint:disable:no-unused-variable */

export class AssetSearch {
    firstResult?: number;
    maxResultHits?: number;
    sorting?: Array<Sort>;
    query: Query;
    facets?: { [key: string]: Facet; };
    metadataToReturn?: Array<string>;
    expand?: Array<ExpandType>;
    returnHits?: boolean;
    returnFacets?: boolean;
    returnPendingImports?: boolean;
    returnHighlightedText?: boolean;
}

export class ExpandType {
}

export class Facet {
    field: string;
    minOccurs?: number;
    maxOccurs?: number;
    expandSelection?: boolean;
    searchOrder?: FacetOrder;
    resultOrder?: FacetOrder;
    selection: FacetSelection;
}

export class FacetOrder {
}

export class FacetSelection {
    values: Array<string>;
    notValues?: Array<string>;
    operation?: string;
}

export class HitElement {
    id?: string;
    thumbnailUrl?: string;
    previewUrl?: string;
    originalUrl?: string;
    highlightedText?: string;
    thumbnailHits?: any;
    metadata?: { [key: string]: any; };
    originalStoragePath?: string;
    relation?: RelationElement;
    permissions?: string;
}

export class Query {
    QueryStringQuery?: QueryStringQuery;
}

export class QueryStringQuery {
    queryString?: string;
}

export class RelationElement {
    relationId?: string;
    relationType?: string;
    directionalRelationType?: string;
    target1Id?: string;
    target2Id?: string;
    metadata?: { [key: string]: any; };
}

export class SearchResponse {
    firstResult?: number;
    maxResultHits?: number;
    totalHits?: number;
    hits?: Array<HitElement>;
}

export class Sort {
    field?: string;
    descending?: boolean;
}


export interface Authentication {
    /**
    * Apply authentication settings to header and query params.
    */
    applyToRequest(requestOptions: request.Options): void;
}

export class HttpBasicAuth implements Authentication {
    public username: string;
    public password: string;
    applyToRequest(requestOptions: request.Options): void {
        requestOptions.auth = {
            username: this.username, password: this.password
        }
    }
}

export class ApiKeyAuth implements Authentication {
    public apiKey: string;

    constructor(private location: string, private paramName: string) {
    }

    applyToRequest(requestOptions: request.Options): void {
        if (this.location == "query") {
            (<any>requestOptions.qs)[this.paramName] = this.apiKey;
        } else if (this.location == "header" && requestOptions && requestOptions.headers) {
            requestOptions.headers[this.paramName] = this.apiKey;
        }
    }
}

export class OAuth implements Authentication {
    public accessToken: string;

    applyToRequest(requestOptions: request.Options): void {
        if (requestOptions && requestOptions.headers) {
            requestOptions.headers["Authorization"] = "Bearer " + this.accessToken;
        }
    }
}

export class VoidAuth implements Authentication {
    public username: string;
    public password: string;
    applyToRequest(_: request.Options): void {
        // Do nothing
    }
}

export enum ElvisApiApiKeys {
}

export class ElvisApi {
    protected basePath = defaultBasePath;
    protected defaultHeaders: any = {};
    public elvisRequest: ElvisRequest;

    protected authentications = {
        'default': <Authentication>new VoidAuth(),
    }

    constructor(username: string, password: string, basePath: string) {
        this.basePath = basePath;
        this.elvisRequest = new ElvisRequest(this.basePath, username, password);
    }

    public setApiKey(key: ElvisApiApiKeys, value: string) {
        this.authentications[ElvisApiApiKeys[key]].apiKey = value;
    }
    /**
     * Create a new asset in Elvis. It can be used to upload files into Elvis. It can also be used to create &#39;virtual&#39; assets like collections. In that case no file has to be uploaded and Elvis will create a 0 kb placeholder for the virtual asset. When you want to create a new asset, certain metadata is required. The metadata is needed to determine where the file will be stored in Elvis.
     * 
     * @param filedata The file to be created in Elvis. If you do not specify a filename explicitly through the metadata, the filename of the uploaded file will be used.   Optional. If omitted, a 0kb placeholder file will be created. 
     * @param metadata A JSON encoded object with properties that match Elvis metadata field names. This metadata will be set on the asset in Elvis.   &#x60;&#x60;&#x60;       {           \&quot;tags\&quot;: [\&quot;foo\&quot;, \&quot;bar\&quot;],           \&quot;description\&quot;: \&quot;foo bar\&quot;       }   &#x60;&#x60;&#x60; 
     * @param metadataToReturn Comma-delimited list of metadata fields to return. Specify &#39;all&#39; to return all available metadata. Omit to return a minimal list of fields.  Optional. If omitted, only the file will be updated. 
     * @param nextUrl When specified, the service will send a 301 redirect to this URL when it completes successfully. If you place &#39;${id}&#39; in the URL, it will be replaced with the Elvis asset id of the updated asset. If omitted, a 200 OK status code will be returned.  Optional. If omitted, the updated HitElement will be returned. 
     */
    public create(filedata?: Buffer, metadata?: string, metadataToReturn?: string, nextUrl?: string): Promise<HitElement> {
        const localVarPath = this.basePath + '/services/create';
        let queryParameters: any = {};
        let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
        let formParams: any = {};


        let useFormData = false;

        if (filedata !== undefined) {
            formParams['Filedata'] = filedata;
        }
        useFormData = true;

        if (metadata !== undefined) {
            formParams['metadata'] = metadata;
        }

        if (metadataToReturn !== undefined) {
            formParams['metadataToReturn'] = metadataToReturn;
        }

        if (nextUrl !== undefined) {
            formParams['nextUrl'] = nextUrl;
        }

        let requestOptions: request.Options = {
            method: 'POST',
            qs: queryParameters,
            headers: headerParams,
            uri: localVarPath,
            json: true,
        };

        this.authentications.default.applyToRequest(requestOptions);

        if (Object.keys(formParams).length) {
            if (useFormData) {
                (<any>requestOptions).formData = formParams;
            } else {
                requestOptions.form = formParams;
            }
        }
        return this.elvisRequest.request(requestOptions);
    }
    /**
     * Move or rename a folder or a single asset.
     * 
     * @param source Either a folderPath or assetPath of the folder or asset to be moved or renamed.  Required. 
     * @param target The folderPath or assetPath to which the folder or asset should be moved or renamed. If the parent folder is the same as in the source path, the asset will be renamed, otherwise it will be moved.  Required. 
     * @param folderReplacePolicy Policy used when destination folder already exists.  * AUTO_RENAME - add &#39;-1&#39; number to destination path. The counter is incremented until a free alternative is found. * MERGE - merge source folder into destination using fileReplacePolicy. * THROW_EXCEPTION - abort the operation.  Optional. If omitted, AUTO_RENAME will be used. 
     * @param fileReplacePolicy Policy used when destination asset already exists.  * AUTO_RENAME - add &#39;-1&#39; number to destination path. The counter is incremented until a free alternative is found. * OVERWRITE - remove destination if it already exists. * OVERWRITE_IF_NEWER - only remove destination if source is newer. Otherwise remove source instead of moving it. * REMOVE_SOURCE - remove source if destination already exists. * THROW_EXCEPTION - abort the operation. * DO_NOTHING - skip move of the file.  Optional. If omitted, AUTO_RENAME will be used. 
     * @param filterQuery When specified, only source assets that match this query will be moved.  Optional. If omitted, all source assets will be moved. 
     * @param flattenFolders When set to true will move all files from source subfolders to directly below the target folder. This will &#39;flatten&#39; any subfolder structure.  Optional. If omitted, folders will not be flattened. 
     * @param async When true, the process will run asynchronous in the background. The call will return immediate with the processId.  Optional. By default, the call waits for the process to finish and then returns the processedCount. 
     */
    public move(source: string, target: string, folderReplacePolicy?: string, fileReplacePolicy?: string, filterQuery?: string, flattenFolders?: boolean, async?: boolean): Promise<any> {
        const localVarPath = this.basePath + '/services/move';
        let queryParameters: any = {};
        let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
        let formParams: any = {};


        // verify required parameter 'source' is not null or undefined
        if (source === null || source === undefined) {
            throw new Error('Required parameter source was null or undefined when calling move.');
        }

        // verify required parameter 'target' is not null or undefined
        if (target === null || target === undefined) {
            throw new Error('Required parameter target was null or undefined when calling move.');
        }

        let useFormData = false;

        if (source !== undefined) {
            formParams['source'] = source;
        }

        if (target !== undefined) {
            formParams['target'] = target;
        }

        if (folderReplacePolicy !== undefined) {
            formParams['folderReplacePolicy'] = folderReplacePolicy;
        }

        if (fileReplacePolicy !== undefined) {
            formParams['fileReplacePolicy'] = fileReplacePolicy;
        }

        if (filterQuery !== undefined) {
            formParams['filterQuery'] = filterQuery;
        }

        if (flattenFolders !== undefined) {
            formParams['flattenFolders'] = flattenFolders;
        }

        if (async !== undefined) {
            formParams['async'] = async;
        }

        let requestOptions: request.Options = {
            method: 'POST',
            qs: queryParameters,
            headers: headerParams,
            uri: localVarPath,
            json: true,
        };

        this.authentications.default.applyToRequest(requestOptions);

        if (Object.keys(formParams).length) {
            if (useFormData) {
                (<any>requestOptions).formData = formParams;
            } else {
                requestOptions.form = formParams;
            }
        }
        return this.elvisRequest.request(requestOptions);
    }
    /**
     * Search in Elvis
     * 
     * @param q The query to search for.
     * @param start First hit to be returned. Starting at 0 for the first hit. Used to skip hits to return &#39;paged&#39; results.  Optional. Default value is 0. 
     * @param num Number of hits to return.  Optional. Default value is 50. 
     * @param metadataToReturn Comma-delimited list of metadata fields to return. Specify &#39;all&#39; to return all available metadata. Omit to return a minimal list of fields.  Optional. If omitted, only the file will be updated. 
     * @param appendRequestSecret When set to true will append an encrypted code to the thumbnail, preview and original URLs. This is useful when the search is transformed to HTML by an intermediary and is then served to a web browser that is not authenticated against the server. The request secret is valid for a limited time (30 minutes).  Optional. Default value is false. 
     */
    public searchGet(q: string, start?: number, num?: number, metadataToReturn?: string, appendRequestSecret?: boolean): Promise<SearchResponse> {
        const localVarPath = this.basePath + '/services/search';
        let queryParameters: any = {};
        let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
        let formParams: any = {};


        // verify required parameter 'q' is not null or undefined
        if (q === null || q === undefined) {
            throw new Error('Required parameter q was null or undefined when calling searchGet.');
        }

        if (q !== undefined) {
            queryParameters['q'] = q;
        }

        if (start !== undefined) {
            queryParameters['start'] = start;
        }

        if (num !== undefined) {
            queryParameters['num'] = num;
        }

        if (metadataToReturn !== undefined) {
            queryParameters['metadataToReturn'] = metadataToReturn;
        }

        if (appendRequestSecret !== undefined) {
            queryParameters['appendRequestSecret'] = appendRequestSecret;
        }

        let useFormData = false;

        let requestOptions: request.Options = {
            method: 'GET',
            qs: queryParameters,
            headers: headerParams,
            uri: localVarPath,
            json: true,
        };

        this.authentications.default.applyToRequest(requestOptions);

        if (Object.keys(formParams).length) {
            if (useFormData) {
                (<any>requestOptions).formData = formParams;
            } else {
                requestOptions.form = formParams;
            }
        }
        return this.elvisRequest.request(requestOptions);
    }
    /**
     * Search in Elvis
     * 
     * @param body AssetSearch object
     */
    public searchPost(body: AssetSearch): Promise<SearchResponse> {
        const localVarPath = this.basePath + '/services/search';
        let queryParameters: any = {};
        let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
        let formParams: any = {};


        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling searchPost.');
        }

        let useFormData = false;

        let requestOptions: request.Options = {
            method: 'POST',
            qs: queryParameters,
            headers: headerParams,
            uri: localVarPath,
            json: true,
            body: body,
        };

        this.authentications.default.applyToRequest(requestOptions);

        if (Object.keys(formParams).length) {
            if (useFormData) {
                (<any>requestOptions).formData = formParams;
            } else {
                requestOptions.form = formParams;
            }
        }
        return this.elvisRequest.request(requestOptions);
    }
    /**
     * Updates the file and/or the metadata for a given asset. It&#39;s required to either specify the Fildata or metadata parameter.
     * 
     * @param id Id of the asset to be updated.
     * @param metadata A JSON encoded object with properties that match Elvis metadata field names. This metadata will be set on the asset in Elvis.   &#x60;&#x60;&#x60;       {           \&quot;tags\&quot;: [\&quot;foo\&quot;, \&quot;bar\&quot;],           \&quot;description\&quot;: \&quot;foo bar\&quot;       }   &#x60;&#x60;&#x60; 
     * @param filedata The file to be updated in Elvis. Note that it&#39;s not mandatory to checkout a file before updating it.  Optional. If omitted, only metadata will be updated. 
     * @param metadataToReturn Comma-delimited list of metadata fields to return. Specify &#39;all&#39; to return all available metadata. Omit to return a minimal list of fields.  Optional. If omitted, only the file will be updated. 
     * @param nextUrl When specified, the service will send a 301 redirect to this URL when it completes successfully. If you place &#39;${id}&#39; in the URL, it will be replaced with the Elvis asset id of the updated asset. If omitted, a 200 OK status code will be returned.  Optional. If omitted, the updated HitElement will be returned. 
     * @param parseMetadataModifications When updating metadata, Elvis parses plus(+) and minus(-) symbols as special characters to add or remove values for multi-value fields. For example, this removes the tag \&quot;foo\&quot; and adds the tag \&quot;bar\&quot;;    &#x60;&#x60;&#x60;       {           \&quot;tags\&quot;: [\&quot;-foo\&quot;, \&quot;+bar\&quot;]       }   &#x60;&#x60;&#x60;      Set to false if you want to disable the parsing and index the exact specified metadata value including the + or - symbol.  Optional. Default value is true 
     * @param clearCheckoutState When the file is checked-out, check in the file as part of updating it.  Optional. Default value is false. 
     * @param createVersion Create a file version when the file is checked in.  Optional. Default value is true. 
     * @param autoRename When set to true, the file is automatically renamed when a file already exists on the destination location. When set to false, an excpetion is thrown when a file already exists.  A destination change can happen when for example the newly updated file has a different extension or when a new filename is specified in the metadata.  Optional. Default value is true. 
     * @param authcred User credentials specifified as a base64 encoded string. Use this alternative type of authentication only for testing purposes or when the user can publicly access assets. Usage example; assume the &#39;admin&#39; user with default password &#39;changemenow&#39;, the authcred is the base64 encoded equivalent of admin:changemenow &#x3D;&gt; YWRtaW46Y2hhbmdlbWVub3c&#x3D;
     */
    public update(id: string, metadata?: string, filedata?: Buffer, metadataToReturn?: string, nextUrl?: string, parseMetadataModifications?: boolean, clearCheckoutState?: boolean, createVersion?: boolean, autoRename?: boolean, authcred?: string): Promise<HitElement> {
        const localVarPath = this.basePath + '/services/update';
        let queryParameters: any = {};
        let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
        let formParams: any = {};


        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling update.');
        }

        let useFormData = false;

        if (id !== undefined) {
            formParams['id'] = id;
        }

        if (metadata !== undefined) {
            formParams['metadata'] = metadata;
        }

        if (filedata !== undefined) {
            formParams['Filedata'] = filedata;
        }
        useFormData = true;

        if (metadataToReturn !== undefined) {
            formParams['metadataToReturn'] = metadataToReturn;
        }

        if (nextUrl !== undefined) {
            formParams['nextUrl'] = nextUrl;
        }

        if (parseMetadataModifications !== undefined) {
            formParams['parseMetadataModifications'] = parseMetadataModifications;
        }

        if (clearCheckoutState !== undefined) {
            formParams['clearCheckoutState'] = clearCheckoutState;
        }

        if (createVersion !== undefined) {
            formParams['createVersion'] = createVersion;
        }

        if (autoRename !== undefined) {
            formParams['autoRename'] = autoRename;
        }

        if (authcred !== undefined) {
            formParams['authcred'] = authcred;
        }

        let requestOptions: request.Options = {
            method: 'POST',
            qs: queryParameters,
            headers: headerParams,
            uri: localVarPath,
            json: true,
        };

        this.authentications.default.applyToRequest(requestOptions);

        if (Object.keys(formParams).length) {
            if (useFormData) {
                (<any>requestOptions).formData = formParams;
            } else {
                requestOptions.form = formParams;
            }
        }
        return this.elvisRequest.request(requestOptions);
    }

    /**
     * Creates an relation with another document.
     * 
     * @param target1Id Id of the 1st asset to be updated.
     * @param target2Id Id of the 2nd asset to be updated.
     * @param relationType Type of relation (Contains, Duplicate or Variation).
     */
    public createRelation(target1Id: string, target2Id: string, relationType: string): Promise<HitElement> {
        const localVarPath = this.basePath + '/services/createRelation';
        let queryParameters: any = {};
        let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
        let formParams: any = {};

        if (target1Id === null || target1Id === undefined || target2Id === null || target2Id === undefined) {
            throw new Error('Required parameter target1Id or target2Id was null or undefined when calling update.');
        }

        let useFormData = true;

        if (relationType !== undefined) {
            formParams['relationType'] = relationType;
        }

        if (target1Id !== undefined) {
            formParams['target1Id'] = target1Id;
        }

        if (target2Id !== undefined) {
            formParams['target2Id'] = target2Id;
        }

        let requestOptions: request.Options = {
            method: 'POST',
            qs: queryParameters,
            headers: headerParams,
            uri: localVarPath,
            json: true,
        };

        this.authentications.default.applyToRequest(requestOptions);

        if (Object.keys(formParams).length) {
            if (useFormData) {
                (<any>requestOptions).formData = formParams;
            } else {
                requestOptions.form = formParams;
            }
        }

        return this.elvisRequest.request(requestOptions);
    }
}
