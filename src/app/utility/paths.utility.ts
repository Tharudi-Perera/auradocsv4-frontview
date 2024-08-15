export function getPrevParent(path: string): string {

    return path.split('/').slice(0, - 2).join('/') + '/'
}

export function capitalizeSegments(path) {
    if(path.endsWith('/')){
      path=path.slice(0,-1);
    }
    return path
        .split('/') // Split the string into segments
        .filter(segment => segment.trim() !== '') // Remove empty segments
        .map(segment => segment.charAt(0).toUpperCase() + segment.slice(1).toLowerCase()) // Capitalize segments
        .join('/'); // Join segments back together with a forward slash separator
}
