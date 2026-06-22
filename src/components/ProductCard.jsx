import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../lib/CartContext';
import { formatMoney } from '../lib/format';

// Accepts either:
//  - Legacy static product (string price, sizes: string[])
//  - API product (number price, sizes: [{id,label}], slug, currency, rating_count)
const ProductCard = ({ product }) => {
  const { add } = useCart();
  const navigate = useNavigate();
  const sizes = product.sizes || [];
  const isApiSize = sizes.length > 0 && typeof sizes[0] === 'object';
  const [sizeId, setSizeId] = useState(isApiSize ? sizes[0]?.id : null);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const ratingDisplay = typeof product.rating === 'string'
    ? product.rating
    : `${Number(product.rating || 0).toFixed(1)}${product.rating_count ? ` (${product.rating_count})` : ''}`;
  const priceDisplay = typeof product.price === 'string' ? product.price : formatMoney(product.price, product.currency);
  const detailHref = product.slug ? `/product/${product.slug}` : null;

  async function onAdd() {
    if (!product.id) return; // legacy demo card with no API id — skip
    setAdding(true);
    try {
      await add(product.id, 1, sizeId);
      setAdded(true);
      setTimeout(() => setAdded(false), 1800);
    } catch { /* swallow */ }
    finally { setAdding(false); }
  }

  async function onBuyNow() {
    if (!product.id) return;
    try {
      await add(product.id, 1, sizeId);
      navigate('/checkout');
    } catch { /* swallow */ }
  }

  const ImageWrap = ({ children }) => detailHref
    ? <Link to={detailHref} className="contents">{children}</Link>
    : <>{children}</>;

  return (
    <article className="flex h-full w-full min-w-0 flex-col text-[#252525]">
      <ImageWrap>
        <div className="relative flex aspect-square items-center justify-center bg-[#f8f8f8] cursor-pointer">
          {product.tag && (
            <span className="absolute left-3 top-3 z-10 bg-white px-1 py-[3px] text-[13px] leading-none tracking-[-0.03em]">
              {product.tag}
            </span>
          )}
          <img className="h-[82%] w-[82%] object-contain" src={product.image} alt={product.name} />
          {product.badge && (
            <img className={`absolute object-contain ${product.badgeClass || 'left-3 bottom-3 h-[78px] w-[78px]'}`} src={product.badge} alt="" aria-hidden="true" />
          )}
        </div>
      </ImageWrap>

      {detailHref ? (
        <Link to={detailHref} className="mt-[39px] block min-h-[46px] text-[17px] font-medium leading-[1.32] tracking-[-0.055em] md:text-[18px] hover:underline">
          {product.name}
        </Link>
      ) : (
        <h3 className="mt-[39px] min-h-[46px] text-[17px] font-medium leading-[1.32] tracking-[-0.055em] md:text-[18px]">{product.name}</h3>
      )}

      <div className="mt-[18px] flex items-center gap-2 text-[13px] tracking-[-0.02em] text-[#2b2b2b]">
        <span className="text-[16px] leading-none text-black">{'★★★★'}<span className="text-black/35">{'★'}</span></span>
        <span>{ratingDisplay}</span>
      </div>
      <p className="mt-2 min-h-[36px] text-[15px] leading-[1.25] tracking-[-0.045em] text-[#666]">{product.benefit}</p>
      <div className="mt-auto min-h-[37px]" aria-hidden="true" />
      <div className="border-t border-[#dcdcdc] pt-[23px]">
        <div className="flex items-center justify-between gap-4">
          <p className="text-[17px] font-black tracking-[-0.045em]">{priceDisplay}</p>
          {sizes.length > 0 && (
            <div className="flex gap-4 text-[14px] tracking-[-0.04em] text-[#555]">
              {sizes.map((size, index) => {
                const label = typeof size === 'string' ? size : size.label;
                const id    = typeof size === 'string' ? null : size.id;
                const isActive = isApiSize ? sizeId === id : index === 0;
                return (
                  <button key={typeof size === 'string' ? size : size.id} type="button"
                    onClick={() => isApiSize && setSizeId(id)}
                    className={isActive ? 'font-semibold text-[#242424] underline underline-offset-2' : ''}>
                    {label}
                  </button>
                );
              })}
            </div>
          )}
        </div>
        <div className="mt-[25px] grid grid-cols-2 gap-2">
          <button type="button" onClick={onAdd} disabled={adding || !product.id}
            className="h-11 border border-[#d9d9d9] bg-white text-[14px] font-medium tracking-[-0.055em] transition-colors hover:border-black disabled:opacity-60 cursor-pointer">
            {added ? 'Added ✓' : adding ? 'Adding…' : 'Add To Cart'}
          </button>
          <button type="button" onClick={onBuyNow} disabled={!product.id}
            className="h-11 bg-[#1b4423] text-white text-[14px] font-medium tracking-[-0.055em] transition-colors hover:bg-[#0f2c16] disabled:opacity-60 cursor-pointer">
            Buy Now
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
