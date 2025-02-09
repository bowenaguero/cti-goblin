
const SKELETON = {
    "type" : undefined,
    "spec_version" : "2.1",
    "id" : "indicator--8e2e2d2b-17d4-4cbf-938f-98ee46b3cd3f", //placeholder
    "created_by_ref" : "identity--f431f809-377b-45e0-aa1c-6a4751cae5ff", //placeholder
    "created" : undefined,
    "modified" : undefined,
    "indicator_types" : ["malicious-activity"],
    "name" : undefined,
    "description" : undefined,
    "pattern" : undefined,
    "pattern_type" : "stix",
    "valid_from" : undefined
}

const PATTERN_MAP = {
    "domains" : "domain-name",
    "ipv4s" : "ipv4-addr",
    "md5s" : "file:hashes.md5",
    "sha1s" : "file:hashes.sha1",
    "sha256s" : "file:hashes.sha256"
}

function generatePattern(ioc_type, ioc_value) {
    const pattern = `[${PATTERN_MAP[ioc_type]}:value = '${ioc_value}']`
    
    return pattern;
}


export function jsonToStix(data) {
    
    
    return;
}