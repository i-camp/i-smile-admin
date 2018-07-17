export interface HasLayout {
  onFullLayout(): void;
  onPhotoOnlyLayout(): void;
  onResultLayout(): void;
}

export enum Layout {
  Full = 'full',
  PhotoOnly = 'photo-only',
  Result = 'result'
}
