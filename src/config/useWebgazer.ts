// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { WebGazer, WebGazerParams } from 'webgazer';

export async function useWebgazer(
  params: Partial<WebGazerParams> = {}
): Promise<WebGazer> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const webgazer = (await import('webgazer')).default;
  const resizeWidth = 10;
  const resizeHeight = 6;
  webgazer.util.getEyeFeats = (eyes: any) => {
    const process = (eye: any) => {
      const resized = webgazer.util.resizeEye(eye, resizeWidth, resizeHeight);
      if (!resized) return;
      const gray = webgazer.util.grayscale(
        resized.data,
        resized.width,
        resized.height
      );
      const hist: any = [];
      webgazer.util.equalizeHistogram(gray, 5, hist);
      return hist;
    };

    if (webgazer.params.trackEye == 'left') {
      return process(eyes.left);
    } else if (webgazer.params.trackEye == 'right') {
      return process(eyes.right);
    } else {
      return [].concat(process(eyes.left), process(eyes.right));
    }
  };
  webgazer.params = {
    ...webgazer.params,
    ...params,
  };
  return webgazer;
}
