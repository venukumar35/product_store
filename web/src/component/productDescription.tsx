export function TopProductionDescription({ topdes }: any) {
  return (
    <div>
      {topdes.map((top) => (
        <div className="flex flex-col space-y-3">
          <div className="inline-flex space-x-4">
            <div>weight:</div>
            <div>{top.weight}</div>
          </div>
          <div className="inline-flex space-x-4">
            <div>chest:</div>
            <div>{top.chest}</div>
          </div>
          <div className="inline-flex space-x-4">
            <div>shoulder:</div>
            <div>{top.shoulder}</div>
          </div>
          <div className="inline-flex space-x-4">
            <div>type:</div>
            <div>{top.type}</div>
          </div>
          <div className="inline-flex space-x-4">
            <div>colorFamily:</div>
            <div>{top.colorFamily}</div>
          </div>
          <div className="inline-flex space-x-4">
            <div>printAndPattern:</div>
            <div>{top.printAndPattern}</div>
          </div>
          <div className="inline-flex space-x-4">
            <div>length:</div>
            <div>{top.length}</div>
          </div>
          <div className="inline-flex space-x-4">
            <div>sleeveType:</div>
            <div>{top.sleeveType.name}</div>
          </div>
          <div className="inline-flex space-x-4">
            <div>neckType:</div>
            <div>{top.neckType.name}</div>
          </div>
          <div className="inline-flex space-x-4">
            <div>pocket:</div>
            <div>{top.pocket}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
export function BottomProductionDescription({ bottomDes }: any) {
  return (
    <div>
      {bottomDes.length > 0 ? (
        <>
          {bottomDes.map((e, index) => (
            <div className="flex flex-col space-y-3" key={index}>
              <div className="inline-flex space-x-4">
                <div>productDescription:</div>
                <div>{e.productDescription}</div>
              </div>
              <div className="inline-flex space-x-4">
                <div>weight:</div>
                <div>{e.weight}</div>
              </div>
              <div className="inline-flex space-x-4">
                <div>printAndPattern:</div>
                <div>{e.printAndPattern}</div>
              </div>
              <div className="inline-flex space-x-4">
                <div>length:</div>
                <div>{e.length}</div>
              </div>
              <div className="inline-flex space-x-4">
                <div>waist:</div>
                <div>{e.waist}</div>
              </div>
              <div className="inline-flex space-x-4">
                <div>hip:</div>
                <div>{e.hip}</div>
              </div>
              <div className="inline-flex space-x-4">
                <div>colorFamily:</div>
                <div>{e.colorFamily}</div>
              </div>
              <div className="inline-flex space-x-4">
                <div>pocket:</div>
                <div>{e.pocket}</div>
              </div>
              <div>
                <div>belt loop:</div>
                <div>{e.beltLoop}</div>
              </div>
              <div className="inline-flex space-x-4">
                <div>type of pant:</div>
                <div>{e.typesOfPants.name}</div>
              </div>
              <div className="inline-flex space-x-4">
                <div>type of length:</div>
                <div>{e.typesOfLength.name}</div>
              </div>
              <div className="inline-flex space-x-4">
                <div>type of pleat:</div>
                <div>{e.typesOfPleats.name}</div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export function KurtasProductDescription({ kurtasDes }: any) {
  return (
    <div>
      {kurtasDes.map((e: any, index: number) => (
        <div key={index} className="flex flex-col space-y-3 mb-4">
          <div className="inline-flex space-x-4">
            <div>productDescription:</div>
            <div>{e.productDescription}</div>
          </div>
          <div className="inline-flex space-x-4">
            <div>work:</div>
            <div>{e.work}</div>
          </div>
          <div className="inline-flex space-x-4">
            <div>chest:</div>
            <div>{e.chest}</div>
          </div>
          <div className="inline-flex space-x-4">
            <div>shoulder:</div>
            <div>{e.shoulder}</div>
          </div>
          <div className="inline-flex space-x-4">
            <div>transparency of fabric:</div>
            <div>{e.transparencyOfTheFabric}</div>
          </div>
          <div className="inline-flex space-x-4">
            <div>length:</div>
            <div>{e.kurtasLengthType.name}</div>
          </div>
          <div className="inline-flex space-x-4">
            <div>weight:</div>
            <div>{e.weight}</div>
          </div>
          <div className="inline-flex space-x-4">
            <div>colorFamily:</div>
            <div>{e.colorFamily}</div>
          </div>
          <div className="inline-flex space-x-4">
            <div>pocket:</div>
            <div>{e.pocket}</div>
          </div>
          <div className="inline-flex space-x-4">
            <div>print and pattern:</div>
            <div>{e.printAndpattern}</div>
          </div>
          <div className="inline-flex space-x-4">
            <div>neck type:</div>
            <div>{e.neckType.name}</div>
          </div>
          <div className="inline-flex space-x-4">
            <div>sleeve type:</div>
            <div>{e.sleeveType.name}</div>
          </div>
          {e.bottomDescription.length > 0 && (
            <div className="flex flex-col space-y-3">
              {e.bottomDescription.map((eb: any, idx: number) => (
                <div key={idx} className="flex flex-col space-y-3 mb-4">
                  <div className="inline-flex space-x-4">
                    <div>productDescription:</div>
                    <div>{eb.productDescription}</div>
                  </div>
                  <div className="inline-flex space-x-4">
                    <div>weight:</div>
                    <div>{eb.weight}</div>
                  </div>
                  <div className="inline-flex space-x-4">
                    <div>printAndPattern:</div>
                    <div>{eb.printAndPattern}</div>
                  </div>
                  <div className="inline-flex space-x-4">
                    <div>length:</div>
                    <div>{eb.length}</div>
                  </div>
                  <div className="inline-flex space-x-4">
                    <div>waist:</div>
                    <div>{eb.waist}</div>
                  </div>
                  <div className="inline-flex space-x-4">
                    <div>hip:</div>
                    <div>{eb.hip}</div>
                  </div>
                  <div className="inline-flex space-x-4">
                    <div>type:</div>
                    <div>{eb.type}</div>
                  </div>
                  <div className="inline-flex space-x-4">
                    <div>colorFamily:</div>
                    <div>{eb.colorFamily}</div>
                  </div>
                  <div className="inline-flex space-x-4">
                    <div>pocket:</div>
                    <div>{eb.pocket}</div>
                  </div>
                  <div>
                    <div>belt loop:</div>
                    <div>{eb.beltLoop}</div>
                  </div>
                  <div className="inline-flex space-x-4">
                    <div>type of pant:</div>
                    <div>{eb.typesOfPants.name}</div>
                  </div>
                  <div className="inline-flex space-x-4">
                    <div>type of length:</div>
                    <div>{eb.typesOfLength.name}</div>
                  </div>
                  <div className="inline-flex space-x-4">
                    <div>type of pleat:</div>
                    <div>{eb.typesOfPleats.name}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
export function ShoesProductDescription({ shoesDes }: any) {
  return (
    <div>
      {shoesDes.map((es, index: number) => (
        <div key={index} className="flex flex-col space-y-3 mb-4">
          <div className="inline-flex space-x-4">
            <div>pattern:</div>
            <div>{es.pattern}</div>
          </div>{" "}
          <div className="inline-flex space-x-4">
            <div>footLength:</div>
            <div>{es.footLength}</div>
          </div>{" "}
          <div className="inline-flex space-x-4">
            <div>type:</div>
            <div>{es.type}</div>
          </div>{" "}
          <div className="inline-flex space-x-4">
            <div>soleMaterial:</div>
            <div>{es.soleMaterial}</div>
          </div>{" "}
          <div className="inline-flex space-x-4">
            <div>printAndPattern:</div>
            <div>{es.printAndPattern}</div>
          </div>{" "}
          <div className="inline-flex space-x-4">
            <div>upperMaterial:</div>
            <div>{es.upperMaterial}</div>
          </div>{" "}
          <div className="inline-flex space-x-4">
            <div>closure:</div>
            <div>{es.closure}</div>
          </div>{" "}
          <div className="inline-flex space-x-4">
            <div>toeType:</div>
            <div>{es.toeType}</div>
          </div>
          <div className="inline-flex space-x-4">
            <div>weight:</div>
            <div>{es.weight}</div>
          </div>
          <div className="inline-flex space-x-4">
            <div>colorFamily:</div>
            <div>{es.colorFamily}</div>
          </div>
          <div className="inline-flex space-x-4">
            <div>productDescription:</div>
            <div>{es.productDescription}</div>
          </div>
          <div className="inline-flex space-x-4">
            <div>packageContains:</div>
            <div>{es.packageContains}</div>
          </div>
          <div>
            {es.warranty.map((e) => (
              <div className="inline-flex space-x-4">
                <div>warranty:</div>
                <div>{e.warrantyPeriod}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
export function InnerProductDescription({ innerDes }: any) {
  return (
    <div>
      {innerDes.map((es, index: number) => (
        <div key={index} className="flex flex-col space-y-3 mb-4">
          <div className="inline-flex space-x-4">
            <div>productDescription:</div>
            <div>{es.productDescription}</div>
          </div>
          <div className="inline-flex space-x-4">
            <div>type:</div>
            <div>{es.type}</div>
          </div>{" "}
          <div className="inline-flex space-x-4">
            <div>weight:</div>
            <div>{es.weight}</div>
          </div>
          <div className="inline-flex space-x-4">
            <div>pattern:</div>
            <div>{es.pattern}</div>
          </div>{" "}
          <div className="inline-flex space-x-4">
            <div>length:</div>
            <div>{es.length}</div>
          </div>{" "}
          <div className="inline-flex space-x-4">
            <div>waistRise:</div>
            <div>{es.waistRise}</div>
          </div>{" "}
          <div className="inline-flex space-x-4">
            <div>printAndPattern:</div>
            <div>{es.printAndPattern}</div>
          </div>{" "}
          <div className="inline-flex space-x-4">
            <div>colorFamily:</div>
            <div>{es.colorFamily}</div>
          </div>
          <div>
            {es.sleeveType != null && es.neckType != null ? (
              <div>
                <div className="inline-flex space-x-4">
                  <div>sleeve type:</div>
                  <div>{es.sleeveType.name}</div>
                </div>
                <div className="inline-flex space-x-4">
                  <div>neck type:</div>
                  <div>{es.neckType.name}</div>
                </div>
              </div>
            ) : undefined}
          </div>
          <div className="inline-flex space-x-4">
            <div>look and feel:</div>
            <div>{es.lookAndFeel}</div>
          </div>{" "}
          <div className="inline-flex space-x-4">
            <div>packageContains:</div>
            <div>{es.packageContains}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
export function WatchesProductDescription({ watchesDes }: any) {
  return (
    <div>
      {watchesDes.map((es, index: number) => (
        <div key={index} className="flex flex-col space-y-3 mb-4">
          <div className="inline-flex space-x-4">
            <div>productDescription:</div>
            <div>{es.productDescription}</div>
          </div>
          <div className="inline-flex space-x-4">
            <div>type:</div>
            <div>{es.type}</div>
          </div>{" "}
          <div className="inline-flex space-x-4">
            <div>weight:</div>
            <div>{es.weight}</div>
          </div>
          <div className="inline-flex space-x-4">
            <div>print and pattern:</div>
            <div>{es.printAndPattern}</div>
          </div>{" "}
          <div className="inline-flex space-x-4">
            <div>color family:</div>
            <div>{es.colorFamily}</div>
          </div>
          <div className="inline-flex space-x-4">
            <div>model:</div>
            <div>{es.model}</div>
          </div>{" "}
          <div className="inline-flex space-x-4">
            <div>dial shape:</div>
            <div>{es.dialShape}</div>
          </div>{" "}
          <div className="inline-flex space-x-4">
            <div>dial diameter:</div>
            <div>{es.dialDiameter}</div>
          </div>
          <div className="inline-flex space-x-4">
            <div>dial color:</div>
            <div>{es.dialColor}</div>
          </div>{" "}
          <div className="inline-flex space-x-4">
            <div>strap color:</div>
            <div>{es.strapColor}</div>
          </div>
          <div>
            {es.warranty.map((e) => (
              <div className="inline-flex space-x-4">
                <div>warranty:</div>
                <div>{e.warrantyPeriod}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
export function PerfumesProductDescription({ perfumesDes }: any) {
  return (
    <div>
      {perfumesDes.map((es, index: number) => (
        <div key={index} className="flex flex-col space-y-3 mb-4">
          <div className="inline-flex space-x-4">
            <div>productDescription:</div>
            <div>{es.productDescription}</div>
          </div>
          <div className="inline-flex space-x-4">
            <div>type:</div>
            <div>{es.type}</div>
          </div>{" "}
          <div className="inline-flex space-x-4">
            <div>weight:</div>
            <div>{es.weight}</div>
          </div>
          <div className="inline-flex space-x-4">
            <div>material description:</div>
            <div>{es.materialDescription}</div>
          </div>{" "}
        </div>
      ))}
    </div>
  );
}
